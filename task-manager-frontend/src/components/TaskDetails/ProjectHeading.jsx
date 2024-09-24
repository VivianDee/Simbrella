import React from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import { useStore } from '../../hooks/stores';
import "../Styles/TeamDashboard.scss";

// Project Heading
const ProjectHeading = () => {
  const { authStore, projectStore } = useStore();
  const user = authStore.user;
  const projects = projectStore.projects;
  const selectedProject = projectStore.selectedProject;

  return (
    <div>
      <div className="dropdown-container">
        <div
          className="msg msg-department anim-y w-100"
          value={selectedProject ? selectedProject.id : ""}
          onChange={(e) => {
            const selectedProjectId = parseInt(e.target.value);
            const project = projectStore.getProjectById(selectedProjectId);
            projectStore.setSelectedProject(project);
          }}
        >
        {selectedProject ? selectedProject.name : ""}   
        </div>
      </div>
    </div>
  );
};

export default observer(ProjectHeading);
