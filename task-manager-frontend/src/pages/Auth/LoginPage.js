// src/pages/Auth/LoginPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import Login from '../../components/Auth/Login';

const LoginPage = () => {
    return (
        <div>
            <h1>Login Page</h1>
            <Login />
            <p>
                Don't have an account?{' '}
                <Link to="/signup">Sign up here</Link> {/* Link to Signup page */}
            </p>
        </div>
    );
};

export default LoginPage;
