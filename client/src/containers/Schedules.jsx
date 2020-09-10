import React, { Component } from "react";

import {Button} from 'react-bootstrap';


class Schedules extends Component{


 handleClick(e) {
  e.preventDefault();
  


}

render() {
  return (
    <div className="Home">
      <div className="lander">
        <h1>Schedules</h1>
      </div>
      <Button className='homeBtn' block bssize="large" onClick={this.handleClick.bind(this)}>Start a Texas Hold'em Table</Button>
    </div>
  );
}
}

export default Schedules