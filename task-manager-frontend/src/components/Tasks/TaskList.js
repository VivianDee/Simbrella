import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://127.0.0.1:8005/api/tasks', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "x-api-key": "sk_test_4eC39HqLyjWDarjtT1zdp7dc_8b5kR9QwA2mK7X6YvJ0zLf3Gp1N8cT4Ue9G7O2W8P9H0yR1tQ6xF3L5Vb2Z9J7U", 
                },
            });
            setTasks(response.data.data);
        };

        fetchTasks();
    }, []);

    return (
        <div>
            <h2>Your Tasks</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>{task.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
