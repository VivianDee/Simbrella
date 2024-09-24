import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import { useStore } from '../../hooks/stores';
import axios from "axios";
import TaskAssigneeDetails from '../TaskDetails/TaskAssigneeDetails';
import TaskDetails from '../TaskDetails/TaskDetails';
import "../Styles/TeamDashboard.scss";

// Main Container Component
const MainContainer = () => {

  const { authStore, projectStore } = useStore();
  const selectedProject = projectStore.selectedProject;


  return (
    <div className="main-container">
      <TaskAssigneeDetails
      />
      {selectedProject && selectedProject.tasks && selectedProject.tasks.length > 0 ? (
        <TaskDetails/>
      ) : (
         
        <div className="msg selected-bg anim-y text-center w-100">
        <div className="msg-content text-center w-100">
          <div className="msg-title text-center w-100">No tasks available for selected project.</div>
        </div>
      </div>
      )}
    </div>
  );
};


export default observer(MainContainer);