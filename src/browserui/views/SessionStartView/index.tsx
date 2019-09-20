import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { SessionStartViewContainer } from "~/browserui/views/SessionStartView/style";
import { Project, ProjectState } from '~/browserui/models/project';

let currentProject:Project;

const onButtonGoClick = () => {
  currentProject.projectState = ProjectState.Browsing;
}

export const SessionStartView = observer(({ project }: { project: Project }) => {
  currentProject = project;
  
  return (
    <SessionStartViewContainer visible={project.projectState == ProjectState.Planning}>
      <h1>Testing 123</h1>
      <button onClick={onButtonGoClick}>Go!!</button>
    </SessionStartViewContainer>
  );
});