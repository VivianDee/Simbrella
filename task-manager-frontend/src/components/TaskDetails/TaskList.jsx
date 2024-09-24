import React, { useEffect } from "react";
import Task from './Task';
import { observer } from "mobx-react";
import { useStore } from '../../hooks/stores';
import "../Styles/TeamDashboard.scss";

// Task List Component
const TaskList = () => {

  const { authStore, projectStore, taskStore } = useStore();
  const selectedProject = projectStore.selectedProject;
  const tasks = taskStore.tasks;

  useEffect(() => {
    if (selectedProject) {
      taskStore.updateTasks(selectedProject.tasks);
    }
  }, [selectedProject, taskStore]);
  
  return (
    <>
      {tasks && tasks.length > 0 ? (
        tasks.map((task, index) => (
          <Task
          key={task.id}
          taskId={task.id}
          />
        ))
      ) : (
        
         <div className="msg selected-bg anim-y text-center">
          <div className="msg-content">
            <div className="msg-title text-center w-100 ">No tasks available for this project.</div>
          </div>
        </div>
      )}
    </>
  );
};

export default observer(TaskList);
