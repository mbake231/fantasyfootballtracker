import React, { Component } from "react";
import Table from 'react-bootstrap/Table';
import {Form} from 'react-bootstrap';
import Tabletop from 'tabletop';

class WeeklyLeaderboard extends Component{
  constructor() {
  super();
  this.state = {
      week:"1",
      results: [0,1],
      topsix: []
  }
};

handleChange(e) {
 
   console.log(e.target.value);
     this.setState({week:e.target.value});
 

}

pickColor(num) {

  var numInt = parseInt(num);
  if (numInt=='1')
      return 'lightGreen';
  else if (numInt<7)
      return 'lightBlue';
  else
      return '';
  
}

componentDidMount() {
          //ff_results
          Tabletop.init({
            key: '1t5dO1dNVFE5WcPxBOyFRmvbU31aRyr0QOACgGtUgDpk',
            simpleSheet: true})
            .then((data,tabletop) => data)
            .then(res => {
              this.setState({results:res},
                 () => {      
            })
          });
}


 
 render(){

  return (
    <div><br></br>
      <div id="dropdown" style={{textAlign:'left'}}>
        <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label style={{display:'inline'}}>Week 1  </Form.Label>
        
      </Form.Group>
      </div>
    <Table striped bordered hover size="sm" >
  <thead>
    <tr>
      <th>Current Rank</th>
      <th>Team</th>
      <th>Fantasy Pts</th>
      <th>League Pts</th>
    </tr>
  </thead>
  
  {this.state.results.map((standings,i) => {
    return (
      <tbody>
      <tr>
        <td style={{backgroundColor: this.pickColor(this.state.results[i].rank)}} >     {i+1} </td>
        <td style={{backgroundColor: this.pickColor(this.state.results[i].rank)}}>{this.state.results[i].team_name}</td>
        <td style={{backgroundColor: this.pickColor(this.state.results[i].rank)}} >{this.state.results[i].fantasy_pts}</td>
        <td style={{backgroundColor: this.pickColor(this.state.results[i].rank)}}>{this.state.results[i].total_pts}</td>
      </tr>
    </tbody>)
    
  }
  
  )}
 
  
</Table> 
<div style={{backgroundColor:'lightGreen'}}>Highest Weekly Score</div>
<div style={{backgroundColor:'lightBlue'}}>Top 6 Weekly Score</div>
</div>
  );

}
}
export default WeeklyLeaderboard 
