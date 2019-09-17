import React from 'react';
import { connect } from 'react-redux';
import { Select, Button, TextInput } from "react-materialize";

class SessionStart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {sessionTime: "15", task: null}

    this.onSessionStart = props.onSessionStart;
  }

  _handleSessionStart = (event) => {
    event.preventDefault();
    if(this.onSessionStart){
      this.onSessionStart(parseInt(this.sessionTime));
    }
  }

  _handleChange = (key, value) => {
    var newSessionValue = {}
    newSessionValue[key] = value;
    this.setState(newSessionValue);
  };

  render() {
    return (
      <form onSubmit={this._handleSessionStart}>
        <div>
          For the next
          <span>
            <Select value={this.state.sessionTime} onChange={(event) => this._handleChange("sessionTime", event.target.value)}>
              <option value="15">
                15 Minutes
              </option>
              <option value="30">
                30 Minutes
              </option>
              <option value="60">
                1 Hour
              </option>
            </Select>
          </span>
          I will work on
          <span>
            <TextInput placeholder="Business plan research" onChange={(event) => this._handleChange("task", event.target.value)} />
          </span>
        </div>
        <Button disabled={!this.state.task}>
          Start Session
        </Button>
      </form>
    )
  }
}

export default connect()(SessionStart);