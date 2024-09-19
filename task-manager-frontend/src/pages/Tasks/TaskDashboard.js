// src/pages/Tasks/TaskDashboard.js
import React from 'react';
import AddTask from '../../components/Tasks/AddTask';
import TaskList from '../../components/Tasks/TaskList';  // Assuming you already have a TaskList component

const TaskDashboard = () => {
    return (
        <div>
            <h1>Task Dashboard</h1>
            {/* List of Tasks */}
            <TaskList />

            {/* Add a new Task */}
            <AddTask />
        </div>
    );
};

export default TaskDashboard;
