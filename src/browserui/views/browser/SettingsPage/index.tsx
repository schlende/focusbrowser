import * as React from "react";
import * as ReactDOM from "react-dom";
import { observer } from 'mobx-react-lite';
import { SettingsHeader } from './style';


export const SettingsPage = observer(() => {
  return (
    <SettingsHeader>
      Settings page code goes here
    </SettingsHeader>
  );
});