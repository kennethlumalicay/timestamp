var express = require("express");
var app = express();
var url = require("url");
app.get("/*", function(req, res) {
	var queryUrl = url.parse(req.url, true);
	var arr = queryUrl.pathname.substring(1).split("%20");
	console.log(arr.toString());
	if(arr.toString() === "") {
		res.send("get me some date!");
	} else {
		var obj = {
			unix: getUnix(arr),
			natural: getNatural(arr)
		};
		res.send(obj);
	}
});

function getUnix(arr) {
	if(arr.length === 3) {
		var d = getNatural(arr);
		return new Date(d).getTime()/1000; // ms to s
	} else if(arr.toString().match(/\D/)) {
		console.log("non digit");
		return null;
	} else {
		return new Date(parseInt(arr)).getTime();
	}
}
function getNatural(arr) {
	if(arr.length === 3) {
		var d = new Date(arr[0] + " " + arr[1] + ", " + arr[2]);
		if(d) {
			return monthString(d.getMonth()).substring(0,1).toUpperCase() + monthString(d.getMonth()).substring(1) + " " + d.getDate() + ", " + d.getFullYear();
		}
		return d;
	} else if(arr.toString().match(/\D/)) {
		console.log("non digit");
		return null;
	} else {
		var d = new Date(parseInt(arr)*1000); // s to ms
		if(d) {
			return monthString(d.getMonth()) + " " +
				d.getDate() + ", " + d.getFullYear();
		}
		return d;
	}
}
function monthString(month) {
	switch (month) {
		case 0:
			return "January";
			break;
		case 1:
			return "February";
			break;
		case 2:
			return "March";
			break;
		case 3:
			return "April";
			break;
		case 4:
			return "May";
			break;
		case 5:
			return "June";
			break;
		case 6:
			return "July";
			break;
		case 7:
			return "August";
			break;
		case 8:
			return "September";
			break;
		case 9:
			return "October";
			break;
		case 10:
			return "November";
			break;
		case 11:
			return "December";
			break;
	}
}
app.listen(process.env.PORT || 3000);