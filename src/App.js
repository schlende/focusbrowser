import React from 'react';
import './App.css';

import SessionStart from './components/SessionStart';
import BrowserTab from './components/BrowserTab';
import Timer from './components/Timer';

function App() {
  return (
    <div className="App">
      <BrowserTab />
      <Timer/>
    </div>
  );
}

export default App;
