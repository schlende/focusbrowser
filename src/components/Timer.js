import React from 'react';
import './Timer.css';
import { connect } from 'react-redux';
import { Button } from "react-materialize";

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.onSessionEnd = props.onSessionEnd;
    var time = 1 * 60;
    this.state = {startTime: time, remainingTime: time}
  }

  componentDidMount() {
    this.timer = this.startTimer();
  }

  componentWillUnmount() {
    if(this.timer){
      clearInterval(this.timer);
    }
  }

  startTimer(){
    return setInterval(() => {
      this.setState({remainingTime: this.state.remainingTime - 1});
      if(this.state.remainingTime === 0){
        this.onSessionEnd();
      }
    }, 1000);
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