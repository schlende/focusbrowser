import React from 'react';
import './App.css';
import SessionStart from './components/SessionStart';
import BrowserTab from './components/BrowserTab';
import Timer from './components/Timer';

const { globalShortcut } = require('electron').remote;

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    globalShortcut.register('Command+N', () => {
      console.log('Command+N is pressed');
    });
  }

  render() {
    return (
      <div className="App">
        <BrowserTab />
        <Timer />
      </div>
    );
  }
}

export default App;
