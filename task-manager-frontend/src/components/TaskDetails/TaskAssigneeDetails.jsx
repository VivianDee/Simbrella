import React, { useState } from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import { useStore } from '../../hooks/stores';
import { toast } from 'react-toastify';
import ProjectHeading from './ProjectHeading';
import TaskList from './TaskList';
import moment from 'moment';
import TextInput from "../formFields/TextInput";

// Inbox Container Component
const TaskAssigneeDetails = () => {

  const { authStore, projectStore, taskStore } = useStore();
  const selectedProject = projectStore.selectedProject;

  const [showAddTask, setShowAddTask] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  // Handle adding the task
  const handleAddTask = () => {
    if (taskName.trim() !== "" && taskDescription.trim() !== "") {
      const isoString = moment().format('YYYY-MM-DD');
      // Add the task to the selected project (assuming taskStore has a method to do this)
      taskStore.addTask({
        name: taskName,
        description: taskDescription,
        project_id: selectedProject.id,
        created_at: isoString
      });

      setTaskName("");
      setTaskDescription("");
      setShowAddTask(false);
    } else {
      toast.error("Please fill out both fields.");
    }
  };

  return (
    <div className="inbox-container">
      <div className="inbox">
        <div>
          <ProjectHeading />
        </div>
        {!showAddTask && (
          <div>
          {selectedProject && <TaskList />}
        </div>
        )}

      </div>
      {showAddTask && (
        <div style={{backgroundColor: "#fff",}} className="anim-y p-4">
          <div className="dropdown-container p-4" >
            <label className="msg-title text-center w-100" htmlFor="taskName">Task Name</label>
            <TextInput
              label="Task Name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Task Name"
              required
            />
          </div>
          <div className="dropdown-container p-4">
            <label className="msg-title text-center w-100" htmlFor="taskDescription">Task Description</label>
            <TextInput
              id="taskDescription"
              rows="3"
              label="Task Description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Describe your task"
              required
            />
          </div>
          <div className="add-task">
            <button
              className="btn btn-primary add-button"
              onClick={() => setShowAddTask(!showAddTask)}
            >
              {showAddTask ? "Cancel" : "Add Task"}
            </button>
            <button
              className="btn btn-primary add-button"
              onClick={handleAddTask}
            >
              Save Task
            </button>

          </div>

        </div>

      )}
      <div className="add-task">
        <button
          className="btn btn-primary add-button"
          onClick={() => setShowAddTask(!showAddTask)}
          style={{ display: showAddTask ? "none" : "block" }}
        >
          {showAddTask ? "Cancel" : "Add Task"}
        </button>

      </div>
     

    </div>
  );
};

export default observer(TaskAssigneeDetails);
