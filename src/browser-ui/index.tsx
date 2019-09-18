import * as React from "react";
import * as ReactDOM from "react-dom";

const { BrowserWindow, BrowserView } = require('electron').remote;

ReactDOM.render(
    <div>Hello this is a test of the emergency broadcasting system 1234</div>,
    document.getElementById("app")
);