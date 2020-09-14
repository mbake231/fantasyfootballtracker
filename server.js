const path = require("path");
const express = require("express");
const app = express(); // create express app
var cors = require("cors");
const Tabletop = require('tabletop');

var leaderboard = [0,1];
var weeklyLeaderboard = [0,1];
var results = [0,1];

const port = process.env.PORT || 3000 // Heroku will need the PORT environment variable

app.use(cors());
app.use(express.static('client/build'));

// start express server on port 5000
app.listen(port, () => console.log(`App is live on port ${port}!`))




app.get("/lb", (req, res, next) => {
  res.json(leaderboard);
 });

 app.get("/wlb", (req, res, next) => {
  res.json(weeklyLeaderboard);
 });

 app.get("/res", (req, res, next) => {
  res.json(results);
 });

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client','build','index.html'));
})



setInterval(function(){ refreshLeagueData()},10000)


function refreshLeagueData () {

  //leaderboard
  Tabletop.init({
    key: '1pwA-gS0FNiB4acXmOknDZvvC-dcflUVLzi31Wu1MSbA',
    simpleSheet: true})
    .then((data,tabletop) => data)
    .then(res => {
      leaderboard=res;
      //console.log(leaderboard);
    });

    Tabletop.init({
      key: '1pwA-gS0FNiB4acXmOknDZvvC-dcflUVLzi31Wu1MSbA',
      simpleSheet: true})
      .then((data,tabletop) => data)
      .then(res => {
        weeklyLeaderboard=res;
       // console.log(weeklyLeaderboard);
      });


      Tabletop.init({
        key: '1pwA-gS0FNiB4acXmOknDZvvC-dcflUVLzi31Wu1MSbA',
        simpleSheet: true})
        .then((data,tabletop) => data)
        .then(res => {
          results=res;
        //  console.log (results);
        });


};