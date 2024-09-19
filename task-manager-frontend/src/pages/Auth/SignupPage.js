// src/pages/Auth/SignupPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import Signup from '../../components/Auth/Signup';

const SignupPage = () => {
    return (
        <div>
            <h1>Signup Page</h1>
            <Signup />
            <p>
                Already have an account?{' '}
                <Link to="/">Log in here</Link> {/* Link to Login page */}
            </p>
        </div>
    );
};

export default SignupPage;
