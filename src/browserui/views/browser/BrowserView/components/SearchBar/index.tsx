import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { StyledSearchBox, InputContainer, SearchIcon, Input, StyledSearchBar, Form, UpdateIndicatorIcon } from './style';
import { NavigationButtons } from '~/browserui/views/browser/BrowserView/components/NavigationButtons';
import browserSession, { BrowserSession } from '~/browserui/models/browser-session';
import { ToolbarButton } from '../ToolbarButton';
import { icons } from '~/browserui/resources/constants';
import { TimerView } from '~/browserui/views/browser/BrowserView/components/TimerView';
import { Project } from '~/browserui/models/project';

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

const handleUpdateClick = () => {
  // browserSession.autoUpdater.handleUpdate();
}

export const SearchBox = observer(({ browserSession }: { browserSession: BrowserSession }) => {
  currentSession = browserSession;
  let height = 20;
  let hasNewUpdate = true;

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

      <ToolbarButton
        size={20}
        icon={icons.fire}
        style={{ display: hasNewUpdate ? 'visible' : 'none' }}
        onClick={handleUpdateClick}
      />

    </StyledSearchBar>
  );
});