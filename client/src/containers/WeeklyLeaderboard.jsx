import React, { Component } from "react";
import Table from 'react-bootstrap/Table';
import {Form} from 'react-bootstrap';
import Tabletop from 'tabletop';
import axios from 'axios';
import w1 from './weekly_json/w1.json';

class WeeklyLeaderboard extends Component{
  constructor() {
  super();
  this.state = {
      week:2,
      results: [0,1],
      currentWeek:2
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
          */
          
         var url;
         if(process.env.NODE_ENV === 'production')
           url='https://www.leagueofhunks.com/wlb';
         else
           url='http://localhost:3000/wlb';

          axios.get(url)
          .then(res => {
            this.setState({results:res.data})
          });
}


getRankEnding (rank) {
  var rankNum = parseInt(rank);
  if(rankNum == 1)
    return 'st';
  else if (rankNum ==2)
    return 'nd';
  else if (rankNum ==3)
    return 'rd';
  return 'th';

}

handleChange(e) {
 
  
  this.setState({week:e.target.value});
  if(parseInt(e.target.value)==parseInt(this.state.currentWeek)){
    var url;
    if(process.env.NODE_ENV === 'production')
      url='https://www.leagueofhunks.com/wlb';
    else
      url='http://localhost:3000/wlb';

     axios.get(url)
     .then(res => {
       this.setState({results:res.data})
     });
  }
  else {
    if(e.target.value==1)
      this.setState({results:w1});
  }

}
 
 render(){

  return (
    <div><br></br>
      <div id="dropdown" style={{textAlign:'left'}}>
        <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label style={{display:'inline'}}>Week    </Form.Label>
        <Form.Control style={{display:'inline',width:'20%'}} value={this.state.week} as="select" onChange={this.handleChange.bind(this)}>
          <option value ="1" onChange={e => {this.handleChange.bind(this)}}>1</option>
          <option value ="2" onChange={e => {this.handleChange.bind(this)}}>2</option>

        </Form.Control>
      </Form.Group>
      </div>
    <Table striped bordered hover size="sm" >
  <thead>
    <tr>
      <th>Rank</th>
      <th>Team</th>
      <th>Current</th>
      <th>Projected</th>
      
    </tr>
  </thead>
  
  {this.state.results.map((standings,i) => {
    return (
      <tbody>
      <tr>
        <td>     {i+1}</td>
        <td>{this.state.results[i].team_name}</td>
        <td style={{backgroundColor: this.pickColor(this.state.results[i].rank)}} >{this.state.results[i].fantasy_pts} &#40;+{this.state.results[i].total_pts}&#41;</td>
        <td style={{backgroundColor: this.pickColor(this.state.results[i].proj_rank)}} ><i>{this.state.results[i].proj_fantasy_pts} &#40;{this.state.results[i].proj_rank}{this.getRankEnding(this.state.results[i].proj_rank)}&#41;</i></td>
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
