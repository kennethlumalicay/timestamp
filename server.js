var express = require("express");
var app = express();
var url = require("url");
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
app.use(express.static(__dirname + "/view"));
app.get("/*", function(req, res) {
	var queryUrl = url.parse(req.url, true);
	var arr = queryUrl.pathname.substring(1).replace(/%20|\,|\-/g , " ").split(/ +/); // turn %20, \, and \- to space and split with space/s
	if(arr.toString() === "") {
		// home page
		res.sendFile("/index.html");
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
		return null; // non digit
	} else {
		return new Date(parseInt(arr)).getTime();
	}
}
function getNatural(arr) {
	if(arr.length === 3) {
		var d = new Date(arr[0] + " " + arr[1] + ", " + arr[2]);
		if(d) {
			return months[d.getMonth()].substring(0,1).toUpperCase() + months[d.getMonth()].substring(1) + " " + d.getDate() + ", " + d.getFullYear();
		}
		return d;
	} else if(arr.toString().match(/\D/)) {
		return null; // non digit
	} else {
		var d = new Date(parseInt(arr)*1000); // s to ms
		if(d) {
			return months[d.getMonth()] + " " +
				d.getDate() + ", " + d.getFullYear();
		}
		return d;
	}
}
app.listen(process.env.PORT || 3000);