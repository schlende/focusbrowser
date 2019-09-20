import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { SessionStartViewContainer, StyledWorkOnInput, StyledWorkOnContainer, GoButton } from "~/browserui/views/SessionStartView/style";
import { Project, ProjectState } from '~/browserui/models/project';
import { observable } from 'mobx';

let currentProject: Project;

const onButtonGoClick = () => {
  currentProject.startSession(15);
}

export const SessionStartView = observer(({ project }: { project: Project }) => {
  currentProject = project;

  return (
    <SessionStartViewContainer visible={project.projectState == ProjectState.Planning}>
      <div>
        <h1>For the next 15 minutes I will work on...</h1>
        <StyledWorkOnContainer>
          <StyledWorkOnInput value={project.currentTask} onChange={(event) => project.currentTask = event.target.value}/>
        </StyledWorkOnContainer>
        <GoButton disabled={project.currentTask == ''} onClick={onButtonGoClick}>Start!!</GoButton>
      </div>
    </SessionStartViewContainer>
  );
});