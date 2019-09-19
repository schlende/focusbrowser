import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { ITab } from '../../../models/tab';

import { StyledTab, TabContainer, StyledIcon, StyledClose, StyledContent } from './style';
import browserSession from '~/browserui/models/browser-session';

const removeTab = (tab: ITab) => {
  browserSession.removeTab(tab);
};

const setSelectedTab = (tab: ITab) => {
  console.log("Selected tab set");
  browserSession.selectedTab = tab;
}

export default observer(({ tab }: { tab: ITab }) => {
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