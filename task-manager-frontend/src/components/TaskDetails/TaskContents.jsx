import React, { useEffect } from 'react';
import Icon from '../Icons/Icon';
import { observer } from "mobx-react";
import { action } from "mobx";
import { useStore } from '../../hooks/stores';

const TaskContents = () => {

  const { taskStore, projectStore } = useStore();
  const selectedTask = taskStore.getSelectedTask();
  const selectedProject = projectStore.selectedProject;

  useEffect(() => {
    if (selectedProject) {
      taskStore.updateSelectedTask(selectedProject.tasks[0]);
    }
  }, [selectedProject, taskStore]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    const formattedDate = date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });

    return `${formattedDate}, ${formattedTime}`;
};
  const handleTaskStatusUpdate = async () => {
    await taskStore.updateTaskStatus(selectedTask.id);
    taskStore.updateSelectedTaskStatus()
    taskStore.toggleTaskSelection(selectedTask.id);
  };

  return (
    <div className="task-contents">
      <div className="task-contents-subject">
        <input
          type="checkbox"
          name="msg"
          id={selectedTask.id}
          className="task-choice"
          checked={selectedTask.status === "completed"}
          onChange={action(() => { handleTaskStatusUpdate(); })}
        />
        <label htmlFor={selectedTask.id}></label>
        <div className="task-contents-title">{selectedTask.name}</div>
      </div>
      <div className="task">
        <div className="task-time">
          <Icon type="clock" />
          {formatDate(selectedTask.created_at)}
        </div>
        <div className="task-inside">{selectedTask.description}</div>
      </div>
    </div>
  );
};

export default observer(TaskContents);