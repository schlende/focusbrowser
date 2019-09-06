import React from 'react';
import './App.css';

import SessionStart from './components/SessionStart';
import BrowserTab from './components/BrowserTab';
import Timer from './components/Timer';
import BrowseControls from './components/BrowseControls';

function App() {
  return (
    <div className="App">
      <BrowseControls />
      <BrowserTab />
      <Timer/>
    </div>
  );
}

export default App;
