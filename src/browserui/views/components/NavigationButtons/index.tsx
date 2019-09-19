import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { StyledContainer } from './style';
import { ToolbarButton } from '../ToolbarButton';
import { icons } from '~/browserui/resources/constants';
import browserSession from '~/browserui/models/browser-session';


const handleBackClick = () => {
  console.log("Back clicked");
  if(browserSession.selectedTab){
    browserSession.selectedTab.goBack();
  }
}

const handleForwardClick = () => {
  if(browserSession.selectedTab){
    browserSession.selectedTab.goForward();
  }
}

const handleReloadClick = () => {
  if(browserSession.selectedTab){
    browserSession.selectedTab.reload();
  }
}

export const NavigationButtons = observer(() => {

  let isWindow = false;
  let loading = false;

  return (
    <StyledContainer>
      <ToolbarButton
        size={24}
        icon={icons.back}
        style={{ marginLeft: 8 }}
        onClick={handleBackClick}
      />
      <ToolbarButton
        size={24}
        icon={icons.forward}
        onClick={handleForwardClick}
      />
      <ToolbarButton
        size={20}
        icon={loading ? icons.close : icons.refresh}
        style={{ marginRight: 8 }}
        onClick={handleReloadClick}
      />
    </StyledContainer>
  );
});