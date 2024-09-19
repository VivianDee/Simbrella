// src/components/Projects/CreateProject.js
import React, { useState } from "react";
import axios from "axios";

const CreateProject = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8005/api/projects",
        {
          name,
          description,
        },
        {
          headers: {
            "x-api-key":
              "sk_test_4eC39HqLyjWDarjtT1zdp7dc_8b5kR9QwA2mK7X6YvJ0zLf3Gp1N8cT4Ue9G7O2W8P9H0yR1tQ6xF3L5Vb2Z9J7U",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Clear the form fields and show a success message
      setName("");
      setDescription("");
      setSuccessMessage("Project created successfully!");
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

  return (
    <div>
      <h2>Create a New Project</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Project Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Create Project</button>
      </form>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default CreateProject;
