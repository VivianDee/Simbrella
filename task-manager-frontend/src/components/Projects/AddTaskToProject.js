import React, { useState } from 'react';
import axios from 'axios';

const AddTaskToProject = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [projectId, setProjectId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.post('http://your-backend-url/api/projects/add-task', {
                title,
                description,
                project_id: projectId,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "x-api-key": "sk_test_4eC39HqLyjWDarjtT1zdp7dc_8b5kR9QwA2mK7X6YvJ0zLf3Gp1N8cT4Ue9G7O2W8P9H0yR1tQ6xF3L5Vb2Z9J7U",
                },
            });
            setTitle('');
            setDescription('');
            setProjectId('');
        } catch (err) {
            console.error('Error adding task to project', err);
        }
    };

    return (
        <div>
            <h2>Add Task to Project</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Project ID"
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                />
                <button type="submit">Add Task</button>
            </form>
        </div>
    );
};

export default AddTaskToProject;
