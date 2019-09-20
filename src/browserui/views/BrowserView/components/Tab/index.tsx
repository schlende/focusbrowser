import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { StyledTab, TabContainer, StyledIcon, StyledClose, StyledContent } from './style';
import { BrowserSession } from '~/browserui/models/browser-session';
import { ITab } from '~/browserui/models/tab';

let currentSession: BrowserSession = null;

const removeTab = (tab: ITab) => {
  currentSession.removeTab(tab);
};

const setSelectedTab = (tab: ITab) => {
  console.log("Selected tab set");
  currentSession.selectedTab = tab;
}

export default observer(({ tab, browserSession }: { tab: ITab, browserSession: BrowserSession }) => {
  currentSession = browserSession;
  
  return (
    <StyledTab
      selected={tab.isSelected}
      title={tab.title}
      onClick={() => setSelectedTab(tab)}
    >
      <TabContainer>
        {tab.title}
        <StyledClose onClick={(event) => { event.stopPropagation(); removeTab(tab); }} />
      </TabContainer>
    </StyledTab>
  );
});