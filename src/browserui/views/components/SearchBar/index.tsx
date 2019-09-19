import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { StyledSearchBox, InputContainer, SearchIcon, Input, StyledSearchBar, Form } from './style';
import { NavigationButtons } from '~/browserui/views/components/NavigationButtons';
import browserSession from '~/browserui/models/browser-session';

const handleUrlBarChange = (event: any) => {
  if (browserSession.selectedTab) {
    browserSession.selectedTab.urlBarValue = event.target.value;
  }
}

const handleUrlSubmit = (event: any) => {
  event.preventDefault();
  var url = browserSession.selectedTab.urlBarValue;

  browserSession.selectedTab.url = url;
}

export const SearchBox = observer(() => {
  let height = 20;

  return (
    <StyledSearchBar>
      <NavigationButtons />
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