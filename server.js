
var mongo = require('mongodb');

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);

app.use(express.static(path.join(__dirname, 'build')));