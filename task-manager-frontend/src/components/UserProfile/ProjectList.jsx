import React from 'react';
import SideWrapper from './SideWrapper';
import TeamMembers from './TeamMembers';
import "../Styles/TeamDashboard.scss";
import { observer } from "mobx-react";
import { action } from "mobx";
import { useStore } from '../../hooks/stores';


// Project List Component
const ProjectList = () => {

  const { authStore, projectStore, taskStore } = useStore();
  const user = authStore.user;
  const projects = projectStore.projects;

  const updateSelectedProject = (project) => {
    projectStore.setSelectedProject(project);
    taskStore.tasks = project.tasks;
  }

  return (
    <div className="project-name">
      {projects.map((project, index) => (
        <div
          key={index}
          onClick={action(() => { updateSelectedProject(project) })}
          className="project-department"
          style={{ cursor: "pointer" }}
        >{project.name}
          <SideWrapper className={"px-0"} title="Team" content={<TeamMembers users={project.team?.users} />} />
        </div>
      ))}
    </div>
  );
};


export default observer(ProjectList);