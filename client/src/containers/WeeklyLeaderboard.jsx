import React, { Component } from "react";
import Table from 'react-bootstrap/Table';
import {Form} from 'react-bootstrap';
import Tabletop from 'tabletop';
import axios from 'axios';
import w1 from './weekly_json/w1.json';
import w2 from './weekly_json/w2.json';
import w3 from './weekly_json/w3.json';
import w4 from './weekly_json/w4.json';
import w5 from './weekly_json/w5.json';
import w6 from './weekly_json/w6.json';
import w7 from './weekly_json/w7.json';
import w8 from './weekly_json/w8.json';
import w9 from './weekly_json/w9.json';
import w10 from './weekly_json/w10.json';
import w11 from './weekly_json/w11.json';
import w12 from './weekly_json/w12.json';
import w13 from './weekly_json/w13.json';
import w14 from './weekly_json/w14.json';




class WeeklyLeaderboard extends Component{
  constructor() {
  super();
  this.state = {
      week:15,
      results: [0,1],
      currentWeek:15
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
            this.setState({results:res.data},
              () => {    
                  this.adjustRankForTies();       
              })
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

adjustRankForTies() {
  if(this.state.results != null) {
    var adjResults = this.state.results;
    adjResults[0].rank = 1;
    for (var i=1;i<12;i++) {
      if(adjResults[i].fantasy_pts == adjResults[i-1].fantasy_pts) {
        
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
    else if(e.target.value==2)
      this.setState({results:w2});
    else if(e.target.value==3)
      this.setState({results:w3});
   else if(e.target.value==4)
      this.setState({results:w4});
    else if(e.target.value==5)
      this.setState({results:w5});
    else if(e.target.value==6)
      this.setState({results:w6});
      else if(e.target.value==7)
      this.setState({results:w7});
      else if(e.target.value==8)
      this.setState({results:w8});
      else if(e.target.value==9)
      this.setState({results:w9});
      else if(e.target.value==10)
      this.setState({results:w10});
      else if(e.target.value==11)
      this.setState({results:w11});
      else if(e.target.value==12)
      this.setState({results:w12});
      else if(e.target.value==13)
      this.setState({results:w13});
      else if(e.target.value==14)
      this.setState({results:w14});
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
          <option value ="3" onChange={e => {this.handleChange.bind(this)}}>3</option>
          <option value ="4" onChange={e => {this.handleChange.bind(this)}}>4</option>
          <option value ="5" onChange={e => {this.handleChange.bind(this)}}>5</option>
          <option value ="6" onChange={e => {this.handleChange.bind(this)}}>6</option>
          <option value ="7" onChange={e => {this.handleChange.bind(this)}}>7</option>
          <option value ="8" onChange={e => {this.handleChange.bind(this)}}>8</option>
          <option value ="9" onChange={e => {this.handleChange.bind(this)}}>9</option>
          <option value ="10" onChange={e => {this.handleChange.bind(this)}}>10</option>
          <option value ="11" onChange={e => {this.handleChange.bind(this)}}>11</option>
          <option value ="12" onChange={e => {this.handleChange.bind(this)}}>12</option>
          <option value ="13" onChange={e => {this.handleChange.bind(this)}}>13</option>
          <option value ="14" onChange={e => {this.handleChange.bind(this)}}>14</option>
          <option value ="15" onChange={e => {this.handleChange.bind(this)}}>15</option>




        </Form.Control>
      </Form.Group>
      </div>
    <Table bgcolor="#c0c0c0" striped bordered hover size="sm" >
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
        <td> {this.state.results[i].rank}</td>
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
