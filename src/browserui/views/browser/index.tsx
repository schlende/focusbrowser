import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserView } from "~/browserui/views/browser/BrowserView";
import browserSession, { BrowserSession } from "~/browserui/models/browser-session";
import { observer } from "mobx-react-lite";
import { Project, ProjectState } from "~/browserui/models/project";
import styled from "styled-components";
import { SessionStartView } from "~/browserui/views/browser/SessionStartView";

const theProject = new Project("The only project");
theProject.browserSession.visible = false;

const TopBar = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  -webkit-app-region: drag;
`

const FocusBrowser = observer(() => {
  let browserSession: BrowserSession = theProject.browserSession;
  return (
    <div>
      <TopBar />
      <SessionStartView project={theProject} />
      <BrowserView project={theProject} browserSession={browserSession} />
    </div>
  )
});

ReactDOM.render(
    <div>
      <FocusBrowser />
    </div>,
    document.getElementById("app")
);