import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { icons } from '~/browserui/resources/constants';

import { AddTab, StyledTabbar, TabsContainer } from './style';

import Tab from '../Tab';
import { ITab } from '~/browserui/models/tab';
import browserSession from '~/browserui/models/browser-session';

const onAddTabClick = () => {
  browserSession.addTab("https://google.com");
};

export const Tabbar = observer(() => {
  return (
    <StyledTabbar>
      <TabsContainer>
        {browserSession.tabs.map(item => (
          <Tab key={item.id} tab={item} />
        ))}
      </TabsContainer>
      <AddTab icon={icons.add} onClick={onAddTabClick} />
    </StyledTabbar>
  );
});