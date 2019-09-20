import browserSession, { BrowserSession } from "~/browserui/models/browser-session";

import { SearchBox } from "~/browserui/views/BrowserView/components/SearchBar";
import { Toolbar } from "~/browserui/views/BrowserView/components/Toolbar";

import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { BrowserContainer } from "~/browserui/views/BrowserView/style";
import { Project, ProjectState } from "~/browserui/models/project";


export const BrowserView = observer(({ project, browserSession }: { project: Project, browserSession: BrowserSession }) => {
  return (
    <BrowserContainer visible={project.projectState == ProjectState.Browsing}>
      <Toolbar browserSession={browserSession} />
      <SearchBox browserSession={browserSession} project={project} />
    </BrowserContainer>
  );
});