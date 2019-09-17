import React from 'react';
import {BrowserView} from 'electron';
import './BrowserTab.css';
import {Button} from 'react-materialize';
import contextMenu from 'electron-context-menu';

const { remote } = require('electron');
const { BrowserWindow, BrowserView } = require('electron').remote;

export default class BrowserTab extends BrowserView {
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

    view.addEventListener('load-commit', (event) => {
      if(this._urlInBlacklist(event.url)){
        view.goBack();
        console.log("Blocked access to: " + event.url);
      }
    });

    // view.addEventListener('new-window', (event) => {
    //   console.log("Attempt to open new window");
    // });

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

    if(this._urlInBlacklist(url)){
      console.log('blocked')
      return;
    }else if(!url.includes('.')){
      url = "https://www.google.com/search?q=" + url;
    }else if (!/^https?:\/\//i.test(url)) {
      url = 'http://' + url;
    }

    this.browser().src = url;
  }

  _urlInBlacklist = (url) => {
    var blacklistterms = this.blacklist.map(term => url.includes(term));
    return blacklistterms.includes(true);
  }

  render() {

    contextMenu({
      window: this.browser()
    });

    return (
      <div className="browser-tab">
        <span className="browser-controls">
          <Button onClick={this.handleBack}>Back</Button>
          <Button onClick={this.handleForward}>Forward</Button>
          <Button onClick={this.handleReload}>Reload</Button>
          <form onSubmit={this._handleUrlSubmit} className="url-form">
            <input className="url-bar" type="text" value={this.state.currentUrl} onChange={this._handleUrlValueChange} />
            <Button>Go</Button>
          </form>
        </span>
        <div className="browser-window">
          <input type="text" />
          <webview id="browser" src="https://google.com" autosize="on" allowpopups="true"></webview> 
        </div>
      </div>
    )
  }
}