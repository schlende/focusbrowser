import React from 'react';
import './BrowserTab.css';


const { remote } = require('electron');
const { BrowserWindow, BrowserView } = require('electron').remote;

export default class BrowserTab extends React.Component {
  constructor(props) {
    super(props);

    this.blacklist = ["trump", "news.ycombinator.com", "youtube.com"];

    this.state = { currentUrl: "https://www.google.com" }
  }

  componentDidMount() {
    var view = this.browser();
    view.addEventListener('did-finish-load', () => {
      this.setState({currentUrl: view.src});
    });
  }

  browser = () => {
    return document.getElementById("browser");
  }

  handleBack = () => {
    this.browser().goBack();
  }

  handleForward = () => {
    this.browser().goForward();
  }

  handleReload = () => {
    this.browser().reload();
  }

  _handleUrlValueChange = (event) => {
    this.setState({currentUrl: event.target.value});
  }

  _handleUrlSubmit = (event) => {
    event.preventDefault();

    var url = this.state.currentUrl;

    if(this.blacklist.includes(url)){
      console.log('blocked')
      return;
    }else if(!url.includes('.')){
      url = "https://www.google.com/search?q=" + url;
    }else if (!/^https?:\/\//i.test(url)) {
      url = 'http://' + url;
    }

    this.browser().src = url;
  }

  render() {
    return (
      <div className="browser-tab">
        <span className="browser-controls">
          <button onClick={this.handleBack}>Back</button>
          <button onClick={this.handleForward}>Forward</button>
          <button onClick={this.handleReload}>Reload</button>
          <form onSubmit={this._handleUrlSubmit} className="url-form">
            <input className="url-bar" type="text" value={this.state.currentUrl} onChange={this._handleUrlValueChange} />
            <input type="submit" value="Go" />
          </form>
        </span>
        <div className="browser-window">
          <input type="text" />
          <webview id="browser" src="https://google.com" autosize="on"></webview> 
        </div>
      </div>
    )
  }
}