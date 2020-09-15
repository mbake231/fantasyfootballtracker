import React, { Component } from "react";
import Table from 'react-bootstrap/Table';
import Tabletop from 'tabletop';
import axios from 'axios';
import Badge from 'react-bootstrap/Badge'

//export default function Leaderboard(props) {
  class Leaderboard extends Component{
    constructor() {
      super();
      this.state = {
          week:"1",
          results: null,
          topsix: []
      }
    };
    
    componentDidMount() {
     var url;
     if(process.env.NODE_ENV === 'production')
       url='https://www.leagueofhunks.com/lb';
     else
       url='http://localhost:3000/lb';

      axios.get(url)
      .then(res => {
        this.setState({results:res.data},
          () => {    
              this.adjustRankForTies();       
          })
      });
}

    adjustRankForTies() {
      if(this.state.results != null) {
        var adjResults = this.state.results;
        adjResults[0].rank = 1;
        for (var i=1;i<12;i++) {
          if(adjResults[i].total_pts == adjResults[i-1].total_pts) {
            
            adjResults[i].rank = adjResults[i-1].rank;
          }
          else
            adjResults[i].rank = i+1;
        }
        this.setState({results:adjResults},
          () => {    
                  
          });
      }
    }

    howManyWithRank(rank) {

      var ctr=0;
      for (var i=0; i<12;i++)
        if(this.state.results[i].rank==rank)
            ctr++;
      
      return ctr;

  }

  checkMedal (name) {
      if(name=='Savvy b')
          return <div style={{display:'inline'}}>
              <img src='./troph.png' width='30px'></img><Badge variant='warning'>124</Badge>
              
          </div>

  }

    calculatePrizes () {

      
        
      

    }



  render(){
    return (
      <div> <br/>
      <h3 style={{textAlign:'left'}}>
      The Table
      </h3>
      <Table striped bordered hover size="sm">
    <thead>
      <tr>
        <th>Rank</th>
        <th>Team</th>
        <th>Name</th>
        <th>Total Points</th>
        <th>Prize</th>
      </tr>
    </thead>
    
    {this.state.results!=null ? (
    this.state.results.map((standings,i) =>
        <tbody>
        <tr>
          <td>{this.state.results[i].rank}</td>
          <td>{this.state.results[i].team_name}{this.checkMedal(this.state.results[i].team_name)}</td>
          <td>{this.state.results[i].name}</td>
          <td>{this.state.results[i].total_pts}</td>
          <td>{this.state.results[i].prize}</td>
        </tr>
      </tbody>
        )) : <div></div>}


    </Table> 
    


    <div style={{textAlign:'left'}}>
    <div style={{display:'inline'}}>
              <img src='./troph.png' width='30px'></img><Badge variant='warning'>Season Long Highest One Week Score ($450)</Badge>
              
          </div>
      <h3>
      Scoring Rules for Drew
      </h3>
      <h5>
        <ul>Win Weekly Matchup: <Badge variant="info">+2 Points</Badge></ul>
        <ul>Highest Weekly Score: <Badge variant="success">+1 Point</Badge></ul>
        <ul>Place 2nd - 6th in a Week: <Badge variant="primary">+1 Point</Badge></ul>
      </h5>
      <br></br>
    </div>
    </div>
      );

    }
  }
export default Leaderboard