import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import SessionStart from './components/SessionStart';
import BrowserTab from './components/BrowserTab';
import Timer from './components/Timer';

const { globalShortcut } = require('electron').remote;


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {page: "/"}
  }

  componentDidMount() {
    globalShortcut.register('Command+N', () => {
      console.log('Command+N is pressed');
    });
  }

  _onSessionStart = (length) => {
    this.timerTime = length;
    this.setState({page: 'browser'});
    console.log("Session started");
  }

  _onSessionEnd = () => {
    this.setState({page: '/'});
    console.log("Session ended");
  }

  _renderData = () => {
    if(this.state.page === 'browser'){
      return(
        <div className="App">
          <BrowserTab />
          <Timer onSessionEnd={this._onSessionEnd} />
        </div>
      );
    }else{
      return(
        <SessionStart onSessionStart={this._onSessionStart} />
      );
    }
  }

  render() {
    var _renderData = this._renderData;
    return (
      <div className='App'>
        { _renderData() }
      </div>
    );
  }
}

export default connect()(App);
