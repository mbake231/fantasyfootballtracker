const path = require("path");
const express = require("express");
const app = express(); // create express app
var cors = require("cors");
const Tabletop = require('tabletop');

var leaderboard = ['Loading...'];
var weeklyLeaderboard = ['Loading...'];
var results = ['Loading...'];
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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



setInterval(function(){ 

var now =  new Date();

if (now.getDay()==0 || now.getDay()==1 || now.getDay()==4) {
    console.log('Day check: '+days[now.getDay()] + " is an NFL gameday!");
  refreshLeagueData();
}
else 
  console.log(days[now.getDay()] + " is not a game day!");

},10000)


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
        key: '1943oBmmjDj6krlZx2Ff7MxgxG-oHoVEqY4VRqFkRaBQ',
        simpleSheet: true})
        .then((data,tabletop) => data)
        .then(res => {
          results=res;
        //  console.log (results);
        console.log("Matchup results updated");
        });


};