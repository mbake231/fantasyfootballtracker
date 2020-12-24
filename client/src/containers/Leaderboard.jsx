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
          winner: "Gor's Navy",
          highScore: 205.38
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
      var winner = this.state.winner;

      if(name==winner)
          return <div style={{display:'inline'}}>
              <img src='./troph.png' width='30px'></img><Badge variant='warning'>{this.state.highScore}</Badge>
              
          </div>

  }

    calculatePrize (rank,name) {

      var winner = this.state.winner;
        //var prizes = [1950,780,500,200,100,40,0,0,0,0,-40,-80];
        var prizes = [2000,1000,500,0,0,0,0,0,0,0,-25,-75];
        var intRank = parseInt(rank);
        var myprize=0;

        for (var i=0; i<this.howManyWithRank(intRank);i++) {
            myprize += prizes[intRank-1+i]
        }

        console.log(myprize+' '+name+' '+winner);

        myprize = Math.floor(myprize/this.howManyWithRank(intRank));

        if (name==winner)
          myprize += 500;

        return '$'+myprize;

        
      

    }



  render(){
    return (
      <div> <br/>
      <h3 style={{textAlign:'left'}}>
      The Table - Playoffs Week 2
      </h3>
      <Table bgcolor="#c0c0c0" striped bordered hover size="sm">
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
          <td>{this.calculatePrize(this.state.results[i].rank,this.state.results[i].team_name)}</td>
        </tr>
      </tbody>
        )) : <div></div>}


    </Table> 
    


    <div style={{textAlign:'left'}}>
    <div style={{display:'inline'}}>
              <img src='./troph.png' width='30px'></img><Badge variant='warning'>Season Long Highest One Week Score ($500)</Badge>
              
          </div>
      <br></br><br></br>
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