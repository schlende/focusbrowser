import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserView } from "~/browserui/views/BrowserView";
import browserSession, { BrowserSession } from "~/browserui/models/browser-session";
import { observer } from "mobx-react-lite";
import { Project, ProjectState } from "~/browserui/models/project";
import styled from "styled-components";

const theProject = new Project("The only project");

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
  browserSession.visible = true;
  return (
    <div>
      <TopBar />
      <BrowserView visible={browserSession.visible} browserSession={browserSession} />
    </div>
  )
});

ReactDOM.render(
    <div>
      <FocusBrowser />
    </div>,
    document.getElementById("app")
);