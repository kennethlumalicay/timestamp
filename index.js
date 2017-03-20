var express = require("express");
var app = express();
app.get("/", function(req, res) {
	res.send("query is " + req.query);
});
app.listen(process.env.PORT || 3000);