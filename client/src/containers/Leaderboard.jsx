import React, { Component } from "react";
import Table from 'react-bootstrap/Table';
import {Button} from 'react-bootstrap';


export default function Leaderboard(props) {

console.log('porps',props);

  return (
    <Table striped bordered hover>
  <thead>
    <tr>
      <th>Rank</th>
      <th>Team</th>
      <th>Name</th>
      <th>Total Points</th>
    </tr>
  </thead>
  
  {props.standings.map((standings,i) =>
      <tbody>
      <tr>
        <td>{i+1}</td>
        <td>{props.standings[i].team_name}</td>
        <td>{props.standings[i].name}</td>
        <td>{props.standings[i].total_pts}</td>
      </tr>
    </tbody>
  
  )}
 
  
</Table> 
  );

}

