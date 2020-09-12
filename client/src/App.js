import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Navbar, Nav, NavDropdown}  from 'react-bootstrap';
import Leaderboard from './containers/Leaderboard';
import Results from './containers/Results';
import Schedules from './containers/Schedules';
import WeeklyLeaderboard from './containers/WeeklyLeaderboard';
import Tabletop from 'tabletop';

import { Route,Switch,Link } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      schedule: null,
      standings: [0,1],
      results: [0,1]
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    };
  


      componentDidMount() {
        //ff_leaderboard
        Tabletop.init({
          key: '1yaNjqP8l-aJeJ6H8HuN3iIxyfbrLO2XdKRjBEG0Rp5k',
          simpleSheet: true})
          .then((data,tabletop) => data)
          .then(lb => {
            this.setState({standings:lb},
               () => {
                //console.log(this.state.standings);
          })
        });
{/*
         //ff_schedule
         Tabletop.init({
          key: '1aiT12bXHxdgntv1W5yQCubSt8J31fT1HWY_eLdnsql4',
          simpleSheet: true})
          .then((data,tabletop) => data)
          .then(sch => {
            this.setState({schedule:sch},
               () => {
                console.log(this.state.schedule);
          })
        });
    */}   


        
 
         
      }
    
  
  
    
render() {
  return (

    <div id="AppContainer">
      <Navbar bg="light" expand="lg">
  <Navbar.Brand href="/">League of Hunks</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/">The Table</Nav.Link>
      <Nav.Link href="/weeklytable">Weekly Leaderboard</Nav.Link>
      <Nav.Link href="/results">Weekly Matchups</Nav.Link>

      
    </Nav>
  </Navbar.Collapse>
</Navbar>
<div id='master-content'>
<Switch>
<Route path="/" exact render={(props) => <Leaderboard standings={this.state.standings}  {...props}  />} />
<Route path="/results" exact render={(props) => <Results results={this.state.results}  {...props}  />} />

            <Route path="/results" exact component={Results} />
            <Route path="/schedules" exact component={Schedules} />
            <Route path="/weeklytable" exact component={WeeklyLeaderboard} />

        </Switch>
        </div>
    </div>
  );
}

}
export default App;
