const path = require("path");
const express = require("express");
const app = express(); // create express app
var cors = require("cors");
const Tabletop = require('tabletop');

var leaderboard = null;
var weeklyLeaderboard = null;
var results = null;
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const port = process.env.PORT || 3000 // Heroku will need the PORT environment variable

app.use(cors());
app.use(express.static('client/build'));

app.use (function (req, res, next) {
  if (req.secure) {
          // request was via http, so do no special handling
          res.redirect('http://' + req.headers.host + req.url);
  } else {
          // request was via http, so do no special handling
          next();
  }
});

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



setInterval(function(){ 

var now =  new Date();

//if (now.getDay()==0 || now.getDay()==1 || now.getDay()==4 || ow.getDay()==2) {
    console.log('Day check: '+days[now.getDay()] + " is an NFL gameday!");
  refreshLeagueData();



},20000)


function refreshLeagueData () {
  console.log('==NEW UPDATE==');
  //leaderboard
  Tabletop.init({
    key: '1pwA-gS0FNiB4acXmOknDZvvC-dcflUVLzi31Wu1MSbA',
    simpleSheet: true})
    .then((data,tabletop) => data)
    .then(res => {
      leaderboard=res;
      console.log("Leaderboard updated");
      
      //console.log(leaderboard);
    });

    Tabletop.init({
      key: '1t5dO1dNVFE5WcPxBOyFRmvbU31aRyr0QOACgGtUgDpk',
      simpleSheet: true})
      .then((data,tabletop) => data)
      .then(res => {
        weeklyLeaderboard=res;
       // console.log(weeklyLeaderboard);
       console.log("Weekly Leaderboard updated");
      });


      Tabletop.init({
        key: '1nEAaQhEhkZpox7RMyTD6GH1lHboE5q_Z-jT_YfdE72c',
        simpleSheet: true})
        .then((data,tabletop) => data)
        .then(res => {
          results=res;
        //  console.log (results);
        console.log("Matchup results updated");
        });


};