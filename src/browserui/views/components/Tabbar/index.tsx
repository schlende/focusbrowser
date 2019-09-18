import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { icons } from '~/browserui/resources/constants';

import { AddTab, StyledTabbar, TabsContainer } from './style';

import Tab from '../Tab';
import { ITab } from '~/browserui/models/tab';

export const Tabbar = observer(() => {
  return (
    <StyledTabbar>
      <TabsContainer>
        <Tab tab={ new ITab() } />
        <Tab tab={ new ITab() } />
        <Tab tab={ new ITab() } />
      </TabsContainer>
      <AddTab icon={icons.add} />
    </StyledTabbar>
  );
});