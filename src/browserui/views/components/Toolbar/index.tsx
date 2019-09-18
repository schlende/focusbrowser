import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Buttons, StyledToolbar, Handle, Separator } from './style';
import { Tabbar } from '../Tabbar';
import { NavigationButtons } from '../NavigationButtons';

export const Toolbar = observer(() => {
  return (
    <StyledToolbar>
      <Tabbar />
    </StyledToolbar>
  );
});

