import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { StyledSearchBox, InputContainer, SearchIcon, Input, StyledSearchBar, Form } from './style';
import { NavigationButtons } from '~/browserui/views/components/NavigationButtons';
import browserSession, { BrowserSession } from '~/browserui/models/browser-session';

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

export const SearchBox = observer(({ browserSession }: { browserSession: BrowserSession }) => {
  currentSession = browserSession;
  let height = 20;

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
    </StyledSearchBar>
  );
});