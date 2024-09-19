// src/pages/Projects/ProjectDashboard.js
import React from 'react';
import CreateProject from '../../components/Projects/CreateProject';
import ProjectList from '../../components/Projects/ProjectList';  // Assuming you already have a ProjectList component

const ProjectDashboard = () => {
    return (
        <div>
            <h1>Project Dashboard</h1>
            {/* List of Projects */}
            <ProjectList />

            {/* Create a new Project */}
            <CreateProject />
            
        </div>
    );
};

export default ProjectDashboard;
