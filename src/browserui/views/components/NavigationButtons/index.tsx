import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { StyledContainer } from './style';
import { ToolbarButton } from '../ToolbarButton';
import { icons } from '~/browserui/resources/constants';

export const NavigationButtons = observer(() => {

  let isWindow = false;
  let loading = false;

  return (
    <StyledContainer>
      <ToolbarButton
        size={24}
        icon={icons.back}
        style={{ marginLeft: 8 }}
      />
      <ToolbarButton
        size={24}
        icon={icons.forward}
      />
      <ToolbarButton
        size={20}
        icon={loading ? icons.close : icons.refresh}
      />
    </StyledContainer>
  );
});