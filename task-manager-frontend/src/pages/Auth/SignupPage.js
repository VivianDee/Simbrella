import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import BasicCard from "../../components/cards/BasicCard";
import TextInput from "../../components/formFields/TextInput";
import EmailInput from "../../components/formFields/EmailInput";
import PasswordInput from "../../components/formFields/PasswordInput";
import SignupForm from "../../components/Forms/Form";

const SignupPage = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const apiKey = process.env.REACT_APP_API_KEY;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);

      // Redirect to homepage after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    // e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `${baseUrl}auth/register`,
        {
          firstName,
          lastName,
          email,
          password,
        },
    
        {
          headers: {
            "x-api-key": `${apiKey}`,
          },
        }
      );
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/"); 
      }, 2000);
    } catch (err) {
      if (err.response) {
        setError("Error: " + (err.response.data.message || err.message));
      } else if (err.request) {
        setError("No response received from the server");
      } else {
        setError("Request failed: " + err.message);
      }
    }
  };

  if (loggedIn) {
    window.location.reload();
  }

  return (
    <div
      className="signup-container flex justify-center items-center min-h-screen p-5 text-center bg-image"
      style={{ background: "rgba(0, 0, 0, 0.0)", zIndex: "999"}}
    >
      <div className="">
        <BasicCard
          title="Create Your Account"
        >
          <SignupForm onSubmit={handleSubmit}>
            <TextInput
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
              required
            />
            <TextInput
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
              required
            />
            <EmailInput
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            <PasswordInput
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Choose a secure password"
              required
            />
            <PasswordInput
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              required
            />
            <div className="text-center mt-4">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </div>
          </SignupForm>
          <p className="text-center mt-3">
            Already have an account? <Link to="/">Log in here</Link>
          </p>
          {error && <p className="text-danger text-center mt-3">{error}</p>}
          {success && (
            <p className="text-success text-center mt-3">{success}</p>
          )}
        </BasicCard>
      </div>
    </div>
  );
};

export default SignupPage;
