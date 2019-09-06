import React from 'react';
import './BrowserTab.css';


const { remote } = require('electron');
const { BrowserWindow, BrowserView } = require('electron').remote;

export default class BrowserTab extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="box browser-tab"> 
        <webview src="https://google.com" autosize="on"></webview> 
      </div>
    )
  }
}