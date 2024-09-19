import React, { useState } from 'react';
import axios from 'axios';

const AddUserToTeam = () => {
    const [user, setUser] = useState('');
    const [teamId, setTeamId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.post('http://127.0.0.1:8005/api/teams/assign', {
                user_id: user,
                team_id: teamId,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "x-api-key": "sk_test_4eC39HqLyjWDarjtT1zdp7dc_8b5kR9QwA2mK7X6YvJ0zLf3Gp1N8cT4Ue9G7O2W8P9H0yR1tQ6xF3L5Vb2Z9J7U",
                },
            });
            setUser('');
            setTeamId('');
        } catch (err) {
            console.error('Error adding user to team', err);
        }
    };

    return (
        <div>
            <h2>Add User to Team</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="user"
                    placeholder="User ID"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Team ID"
                    value={teamId}
                    onChange={(e) => setTeamId(e.target.value)}
                />
                <button type="submit">Add User</button>
            </form>
        </div>
    );
};

export default AddUserToTeam;
