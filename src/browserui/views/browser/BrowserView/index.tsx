import browserSession, { BrowserSession } from "~/browserui/models/browser-session";

import { SearchBox } from "~/browserui/views/browser/BrowserView/components/SearchBar";
import { Toolbar } from "~/browserui/views/browser/BrowserView/components/Toolbar";

import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { BrowserContainer } from "~/browserui/views/browser/BrowserView/style";
import { Project, ProjectState } from "~/browserui/models/project";
import { StyledFind, SearchIcon, Input, Occurrences, Buttons, Button } from "~/browserui/views/browser/BrowserView/style";
import { icons } from "~/browserui/resources/constants";

export const BrowserView = observer(({ project, browserSession }: { project: Project, browserSession: BrowserSession }) => {
  return (
    <BrowserContainer visible={project.projectState == ProjectState.Browsing}>
      <Toolbar browserSession={browserSession} />
      <SearchBox browserSession={browserSession} project={project} />
    </BrowserContainer>
  );
});