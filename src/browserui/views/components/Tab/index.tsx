import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { ITab } from '../../../models/tab';

import { StyledTab, TabContainer, StyledIcon, StyledClose, StyledContent } from './style';

export default observer(({ tab }: { tab: ITab }) => {
  return (
    <StyledTab
      selected={tab.isSelected}
      title={tab.title}
    >
      <TabContainer>
        New Tab
      </TabContainer>
    </StyledTab>
  );
});