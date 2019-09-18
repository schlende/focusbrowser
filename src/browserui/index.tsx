import * as React from "react";
import * as ReactDOM from "react-dom";
import { Toolbar } from "./views/components/Toolbar";
import { SearchBox } from "~/browserui/views/components/SearchBar";

const { BrowserWindow, BrowserView } = require('electron').remote;

ReactDOM.render(
    <div>
      <Toolbar />
      <SearchBox />
    </div>,
    document.getElementById("app")
);