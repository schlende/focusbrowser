import React from 'react';
import './Timer.css';
import { connect } from 'react-redux';
import { Button } from "react-materialize";

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.onSessionEnd = props.onSessionEnd;
    this.state = {remainingTime: 30}
  }

  startTimer(length){

  }

  render() {
    return (
      <span className="timer">
        {this.state.remainingTime}
        <Button onClick={this.onSessionEnd}>End Session Early</Button>
      </span>
    )
  }
}


export default connect()(Timer);