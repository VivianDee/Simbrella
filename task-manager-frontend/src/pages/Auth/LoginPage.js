import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import { action } from "mobx";
import { useStore } from '../../hooks/stores';
import BasicCard from "../../components/cards/BasicCard";
import EmailInput from "../../components/formFields/EmailInput";
import PasswordInput from "../../components/formFields/PasswordInput";
import LoginForm from "../../components/Forms/Form";

const LoginPage = ( {onClose} ) => {
  
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const apiKey = process.env.REACT_APP_API_KEY;
  const { authStore } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
    setError("");

    try {
      const response = await axios.post(
        `${baseUrl}auth/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "x-api-key":
              `${apiKey}`,
          },
        }
      );

      await authStore.setToken(response.data.data.access_token);
      window.location.reload();

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
    <div className="signup-container flex justify-center items-center min-h-screen p-5 text-center bg-image" style={{ background: "rgba(0, 0, 0, 0.0)", zIndex: "999"}}>
      <div>
        <BasicCard
          title="Login to Your Account"
          text="Enter your details below to log in."
        >
          <LoginForm onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
              required
            />
            <div className="text-center mt-4">
              <button type="submit" className="btn btn-primary">
                Log in
              </button>
            </div>
          </LoginForm>
          <p className="text-center mt-3">
            Don't have an account? <Link to="/signup">Sign up here</Link>
          </p>
          {error && <p className="text-danger text-center mt-3">{error}</p>}
        </BasicCard>
      </div>
    </div>
  );
};

export default LoginPage;
