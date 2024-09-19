import React, { useState } from 'react';
import axios from 'axios';

const AddTask = () => {
    const [name, setTitle] = useState('');
    const [description, setDescription] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.post('http://127.0.0.1:8005/api/tasks', {
                name,
                description,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "x-api-key": "sk_test_4eC39HqLyjWDarjtT1zdp7dc_8b5kR9QwA2mK7X6YvJ0zLf3Gp1N8cT4Ue9G7O2W8P9H0yR1tQ6xF3L5Vb2Z9J7U",
                },
            });
            setTitle('');
            setDescription('');
        } catch (err) {
            console.error('Error adding task', err);
        }
    };

    return (
        <div>
            <h2>Add Task</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Task Title"
                    value={name}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">Add Task</button>
            </form>
        </div>
    );
};

export default AddTask;
