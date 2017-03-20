var express = require("express");
var app = express();
app.get("/", function(req, res) {
	document.write("query is " + req.query);
});
app.listen(process.env.PORT || 3000);