import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Buttons, StyledToolbar, Handle, Separator } from './style';
import { Tabbar } from '../Tabbar';

export const Toolbar = observer(() => {
  return (
    <StyledToolbar>
      <Handle />
      <Buttons>
        Testing
        <Separator />
        <Tabbar />
      </Buttons>
    </StyledToolbar>
  );
});

