import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { icons } from '../../../resources/constants/icons';

import { AddTab, StyledTabbar, TabsContainer } from './style';

export const Tabbar = observer(() => {
  return (
    <StyledTabbar>
      <TabsContainer>
        {/* <Tabs /> */}
      </TabsContainer>
      <AddTab icon={icons.add} />
    </StyledTabbar>
  );
});