import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import AddTaskToProject from './components/Projects/AddTaskToProject';
import ProjectDashboard from './pages/Projects/ProjectDashboard';
import TaskDashboard from './pages/Tasks/TaskDashboard';
import TeamDashboard from './pages/Teams/TeamDashboard';
import SignupPage from './pages/Auth/SignupPage';
import LoginPage from './pages/Auth/LoginPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/projects" element={<ProjectDashboard />} />
                <Route path="/tasks" element={<TaskDashboard />} />
                <Route path="/teams" element={<TeamDashboard />} />
                <Route path="/projects/add-task" element={<AddTaskToProject />} />
            </Routes>
        </Router>
    );
};

export default App;

