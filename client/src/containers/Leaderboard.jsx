import React, { Component } from "react";
import Table from 'react-bootstrap/Table';
import Tabletop from 'tabletop';
import axios from 'axios';

//export default function Leaderboard(props) {
  class Leaderboard extends Component{
    constructor() {
      super();
      this.state = {
          week:"1",
          results: [0,1],
          topsix: []
      }
    };
    
    componentDidMount() {
      /*
      //ff_results
      Tabletop.init({
        key: '1pwA-gS0FNiB4acXmOknDZvvC-dcflUVLzi31Wu1MSbA',
        simpleSheet: true})
        .then((data,tabletop) => data)
        .then(res => {
          this.setState({results:res},
             () => {           
        })
      });
      */

      axios.get(`http://localhost:3000/lb`)
      .then(res => {
        this.setState({results:res.data})
      });


}

  render(){
    return (
      <div> <br></br>
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
    
    {this.state.results.map((standings,i) =>
        <tbody>
        <tr>
          <td>{i+1}</td>
          <td>{this.state.results[i].team_name}</td>
          <td>{this.state.results[i].name}</td>
          <td>{this.state.results[i].total_pts}</td>
          <td>{this.state.results[i].prize}</td>
        </tr>
      </tbody>
    
        )}
    
      
    </Table> 
    </div>
      );

    }
  }
export default Leaderboard