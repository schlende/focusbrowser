import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { StyledSearchBox, InputContainer, SearchIcon, Input, StyledSearchBar } from './style';
import { NavigationButtons } from '~/browserui/views/components/NavigationButtons';
export const SearchBox = observer(() => {
  let height = 20;

  return (
    <StyledSearchBar>
      <NavigationButtons />
      <StyledSearchBox style={{ height }} >
        <InputContainer>
          <SearchIcon />
          <Input
            autoFocus
            placeholder="Search or type in URL"
          />
        </InputContainer>
      </StyledSearchBox>
    </StyledSearchBar>
  );
});