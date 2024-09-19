// src/components/Projects/ProjectList.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");

  // Fetch projects when the component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://127.0.0.1:8005/api/projects", {
          headers: {
            "x-api-key":
              "sk_test_4eC39HqLyjWDarjtT1zdp7dc_8b5kR9QwA2mK7X6YvJ0zLf3Gp1N8cT4Ue9G7O2W8P9H0yR1tQ6xF3L5Vb2Z9J7U",
            Authorization: `Bearer ${token}`,
          },
        });
        setProjects(response.data.data);
      } catch (err) {
        // Handle error
        if (err.response) {
          setError("Error: " + (err.response.data.message || err.message));
        } else if (err.request) {
          setError("No response received from the server");
        } else {
          setError("Request failed: " + err.message);
        }
      }
    };

    fetchProjects();
  }, []); // Empty dependency array means it runs only once after the initial render

  return (
    <div>
      <h2>Project List</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!error && projects.length === 0 && <p>No projects available</p>}
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>

            <h3>Team</h3>
            {project.team.users.length > 0 ? (
              project.team.users.map((member) => (
                <p key={member.id}>{member.name}</p>
              ))
            ) : (
              <p>No team members assigned</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
