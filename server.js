
var mongo = require('mongodb');

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3001;

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);


app.get("/data", (req, res, next) => {
  res.json(["Tony","Lisa","Michael","Ginger","Food"]);
 });


