import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { icons } from '~/browserui/resources/constants';

import { AddTab, StyledTabbar, TabsContainer } from './style';

import Tab from '../Tab';
import { BrowserSession } from '~/browserui/models/browser-session';


export const Tabbar = observer(({ browserSession }: { browserSession: BrowserSession }) => {
  return (
    <StyledTabbar>
      <TabsContainer>
        {browserSession.tabs.map(item => (
          <Tab key={item.viewId} tab={item} browserSession={browserSession} />
        ))}
      </TabsContainer>
      <AddTab icon={icons.add} onClick={() => browserSession.addTab("https://google.com")} />
    </StyledTabbar>
  );
});