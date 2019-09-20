import * as React from 'react';
import { observer } from "mobx-react-lite";
import { Project } from "~/browserui/models/project";
import { StyledTimerContainer } from "~/browserui/views/BrowserView/components/TimerView/style";

let currentSession: Project;

const stopSession = () => {
  currentSession.finish();
}

export const TimerView = observer(({ project }: { project: Project }) => {
  currentSession = project;
  let height = 20;

  return (
    <StyledTimerContainer>
      {project.remainingTime}
      <button onClick={stopSession}>Stop</button>
    </StyledTimerContainer>
  );
});