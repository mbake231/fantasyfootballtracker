import React, { Component } from "react";
import Table from 'react-bootstrap/Table';
import {Form} from 'react-bootstrap';


class Results extends Component{
  constructor() {
  super();
  this.state = {
      week:"1"
  }
};

handleChange(e) {
 
   console.log(e.target.value);
     this.setState({week:e.target.value});
 

}

 
 render(){

  return (
    <div>
    <Form.Group controlId="exampleForm.ControlSelect1">
    <Form.Label>Week</Form.Label>
    <Form.Control as="select" onChange={this.handleChange.bind(this)}>
      <option value ="1" onChange={e => {this.updateWeek()}}>1</option>
      <option value ="2" onChange={e => {this.updateWeek()}}>2</option>
      <option value ="3" onChange={e => {this.updateWeek()}}>3</option>

    </Form.Control>
  </Form.Group>
    <Table striped bordered hover size="sm" >
  <thead>
    <tr>
      <th>Team 1</th>
      <th>Pts Won</th>
      <th>Pts Won</th>
      <th>Team 2</th>
    </tr>
  </thead>
  
  {this.props.results.map((standings,i) => {
    if(this.props.results[i].week==this.state.week)
    return (
      <tbody>
      <tr>
        <td>{this.props.results[i].team1_name} <br/> {this.props.results[i].team1_fantasy_points}</td>
        <td>{this.props.results[i].team1_total_Lpts}</td>
        <td>{this.props.results[i].team2_total_Lpts}</td>
        <td>{this.props.results[i].team2_name}<br/>{this.props.results[i].team2_fantasy_points}</td>
      </tr>
    </tbody>)
    else
      console.log('hi'+this.props.results[i].week+"   "+this.state.week)
  }
  
  )}
 
  
</Table> 
</div>
  );

}
}
export default Results 
