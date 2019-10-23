import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { StyledSearchBox, InputContainer, SearchIcon, Input, StyledSearchBar, Form, UpdateButtonToolTip, UpdateButtonToolTipText } from './style';
import { NavigationButtons } from '~/browserui/views/browser/BrowserView/components/NavigationButtons';
import browserSession, { BrowserSession } from '~/browserui/models/browser-session';
import { ToolbarButton } from '../ToolbarButton';
import { icons } from '~/browserui/resources/constants';
import { ipcRenderer } from 'electron';

let currentSession: BrowserSession = null;

const handleUrlBarChange = (event: any) => {
  if (currentSession.selectedTab) {
    currentSession.selectedTab.urlBarValue = event.target.value;
  }
}

const handleUrlSubmit = (event: any) => {
  event.preventDefault();
  var url = currentSession.selectedTab.urlBarValue;

  currentSession.selectedTab.url = url;
}

const AutoUpdateButton = () => {
  if (currentSession.updateAvailable) {
    return (
      <ToolbarButton
        size={20}
        tooltip='Update available!'
        icon={icons.download}
        onClick={handleUpdateClick} />
    )
  } else {
    return (
      <span></span>
    )
  }
}

const handleUpdateClick = () => {
  ipcRenderer.send('update-reaquested');
}

export const SearchBox = observer(({ browserSession }: { browserSession: BrowserSession }) => {
  currentSession = browserSession;
  let height = 20;

  console.log("Reloading SearchBox...." + browserSession.updateAvailable);

  return (
    <StyledSearchBar>

      <NavigationButtons browserSession={browserSession} />

      <StyledSearchBox style={{ height }} >
        <InputContainer>
          <SearchIcon />
          <Form onSubmit={handleUrlSubmit}>
            <Input
              autoFocus
              placeholder="Search or type in URL"
              value={browserSession.currentUrlBarValue}
              onChange={handleUrlBarChange}
            />
          </Form>
        </InputContainer>
      </StyledSearchBox>
      <AutoUpdateButton />
    </StyledSearchBar>
  );
});