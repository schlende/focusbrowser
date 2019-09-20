import browserSession, { BrowserSession } from "~/browserui/models/browser-session";

import { SearchBox } from "~/browserui/views/components/SearchBar";
import { Toolbar } from "~/browserui/views/components/Toolbar";

import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { autorun, observe } from "mobx";
import { BrowserContainer } from "~/browserui/views/BrowserView/style";


export const BrowserView = observer(({ visible, browserSession }: { visible: boolean, browserSession: BrowserSession }) => {
  return (
    <BrowserContainer visible={visible}>
      <Toolbar browserSession={browserSession} />
      <SearchBox browserSession={browserSession} />
    </BrowserContainer>
  );
});