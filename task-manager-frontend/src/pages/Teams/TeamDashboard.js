// src/pages/Teams/TeamDashboard.js
import React from 'react';
import AddUserToTeam from '../../components/Teams/AddUserToTeam';

const TeamDashboard = () => {
    return (
        <div>
            <h1>Team Dashboard</h1>
            {/* Add user to Team */}
            <AddUserToTeam />

        </div>
    );
};

export default TeamDashboard;
