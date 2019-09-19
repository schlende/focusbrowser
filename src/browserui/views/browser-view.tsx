import browserSession from "~/browserui/models/browser-session";

import { SearchBox } from "~/browserui/views/components/SearchBar";
import { Toolbar } from "~/browserui/views/components/Toolbar";

import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { autorun, observe } from "mobx";
import { ITab } from "~/browserui/models/tab";


export const BrowserView = observer(() => {

  observe(browserSession.tabs, (change: any) => {
    console.log(change);
  });

  autorun(() => {
    console.log(browserSession.tabs.length);
  });

  return (
    <div>
      <Toolbar />
      <SearchBox />
    </div>
  );
});