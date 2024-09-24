import React from "react";
import { observer } from "mobx-react";
import { useStore } from '../../hooks/stores';
import { action } from "mobx";
import "../Styles/TeamDashboard.scss";

const Task = ({ taskId }) => {
  const { taskStore } = useStore();
  const task = taskStore.getTaskById(taskId);

  if (!task) return null;

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
    await taskStore.updateTaskStatus(task.id);
    taskStore.toggleTaskSelection(task.id);
  };


  const SetSelectedTask = () => {
    taskStore.selectedTask = task.id;
  };

  return (
    <div 
    className={`msg ${task.status === "completed" ? "selected-bg" : ""} anim-y`}
    onClick={action(() => {SetSelectedTask()})}
    >
      <input
        type="checkbox"
        name="msg"
        id={task.id}
        className="task-choice"
        checked={task.status === "completed"}
        onChange={ action(() => {handleTaskStatusUpdate()})}
      />
      <label htmlFor={task.id}></label>
      <div className="msg-content">
        <div className="msg-title">{task.name}</div>
        <div className="msg-date">{formatDate(task.created_at)}</div>
      </div>
      <img src="https://assets.codepen.io/3364143/Screen+Shot+2020-08-01+at+12.24.16.png" alt="" className="members task-members" />
    </div>
  );
};

export default observer(Task);
