import * as React from "react";
import * as ReactDOM from "react-dom";
import { Toolbar } from "./views/components/Toolbar";

const { BrowserWindow, BrowserView } = require('electron').remote;

ReactDOM.render(
    <div>
      <Toolbar />
    </div>,
    document.getElementById("app")
);