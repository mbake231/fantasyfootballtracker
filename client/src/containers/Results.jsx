import React, { Component } from "react";
import Table from 'react-bootstrap/Table';
import {Form} from 'react-bootstrap';
import Tabletop from 'tabletop';
import axios from 'axios';

class Results extends Component{
  constructor() {
  super();
  this.state = {
      week:"4",
      results: [0,1],
      topsix: []
  }
};

handleChange(e) {
 
     this.setState({week:e.target.value});
 

}

pickColor(num) {
  var numInt = parseInt(num);
  if (numInt==1)
      return 'lightGreen';
  else if (numInt<7)
      return 'lightBlue';
  else
      return '';
  
}

componentDidMount() {
          /*
          Tabletop.init({
            key: '1943oBmmjDj6krlZx2Ff7MxgxG-oHoVEqY4VRqFkRaBQ',
            simpleSheet: true})
            .then((data,tabletop) => data)
            .then(res => {
              this.setState({results:res},
                 () => {           
            })
          });
          */
         var url;
     if(process.env.NODE_ENV === 'production')
       url='https://www.leagueofhunks.com/res';
     else
       url='http://localhost:3000/res';

          axios.get(url)
          .then(res => {
            this.setState({results:res.data})
          });
}


 
 render(){

  return (
    <div><br></br>
      <div id="dropdown" style={{textAlign:'left'}}>
        <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label style={{display:'inline'}}>Week    </Form.Label>
        <Form.Control style={{display:'inline',width:'20%'}} value={this.state.week} as="select" onChange={this.handleChange.bind(this)}>
          <option value ="1" onChange={e => {this.updateWeek()}}>1</option>
          <option value ="2" onChange={e => {this.updateWeek()}}>2</option>
          <option value ="3" onChange={e => {this.updateWeek()}}>3</option>
          <option value ="4" onChange={e => {this.updateWeek()}}>4</option>


        </Form.Control>
      </Form.Group>
      </div>
    <Table striped bordered hover size="lg" >
  <thead>
    <tr>
      <th>Team 1</th>
      <th>Points</th>
      <th>Points</th>
      <th>Team 2</th>
    </tr>
  </thead>
  
  {this.state.results.map((standings,i) => {
    if(this.state.results[i].week==this.state.week)
    return (
      <tbody>
      <tr>
        <td style={{backgroundColor: this.pickColor(this.state.results[i].team1_rank)}} >     {this.state.results[i].team1_name} </td>
        <td style={{backgroundColor: this.pickColor(this.state.results[i].team1_rank)}}>{this.state.results[i].team1_fantasy_points} &#40;+{this.state.results[i].team1_total_Lpts}&#41;</td>
        <td style={{backgroundColor: this.pickColor(this.state.results[i].team2_rank)}} >{this.state.results[i].team2_fantasy_points}  &#40;+{this.state.results[i].team2_total_Lpts}&#41;</td>
        <td style={{backgroundColor: this.pickColor(this.state.results[i].team2_rank)}}>{this.state.results[i].team2_name}</td>
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
export default Results 
