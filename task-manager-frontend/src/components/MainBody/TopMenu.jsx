import React, { useState } from 'react';
import { observer } from "mobx-react";
import { useStore } from '../../hooks/stores';
import "../Styles/TeamDashboard.scss";
import TextInput from '../formFields/TextInput';


const TopMenu = observer(() => {
  const { authStore, projectStore } = useStore();
  const [showAddProject, setShowAddProject] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const handleLogout = async () => {
    await authStore.logout();
    window.location.reload();
  };

  const addProject = async () => {
    if (projectName && projectDescription) {
      await projectStore.addProject({ name: projectName, description: projectDescription, team: [], user: [authStore.user] });
      setProjectName("");
      setProjectDescription("");
      setShowAddProject(false);
    }
  };

  return (
    <div className="add-project">
      <button
        className="btn btn-primary add-button m-2"
        onClick={() => setShowAddProject(true)} // Open modal
      >
        Add Project
      </button>

      {/* Modal */}
      {showAddProject && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Project</h5>
                <button type="button" className="close" onClick={() => setShowAddProject(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="dropdown-container p-4">
                  <label className="msg-title text-center w-100" htmlFor="projectName">Project Name</label>
                  <TextInput
                    id="projectName"
                    label="Project Name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Enter Project Name"
                    required
                  />
                </div>
                <div className="dropdown-container p-4">
                  <label className="msg-title text-center w-100" htmlFor="projectDescription">Project Description</label>
                  <TextInput
                    id="projectDescription"
                    rows="3"
                    label="Project Description"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    placeholder="Describe your project"
                    required
                  />
                </div>
              </div>
              <div className="add-task">
                <button
                  className="btn btn-primary add-button"
                  onClick={() => setShowAddProject(false)} // Close modal
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary add-button"
                  onClick={addProject}
                >
                  Save Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        className="btn btn-primary add-button m-2 px-10"
        onClick={handleLogout}
      >
        Log Out
      </button>
    </div>
  );

});

export default TopMenu;
