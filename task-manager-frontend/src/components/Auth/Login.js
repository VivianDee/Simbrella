import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8005/api/auth/login",
        {
          email,
          password,
        },
        {
          headers: {
            "x-api-key":
              "sk_test_4eC39HqLyjWDarjtT1zdp7dc_8b5kR9QwA2mK7X6YvJ0zLf3Gp1N8cT4Ue9G7O2W8P9H0yR1tQ6xF3L5Vb2Z9J7U",
          },
        }
      );

      localStorage.setItem("token", response.data.data.access_token);

      // Redirect to tasks page after login
      navigate("/tasks");
    } catch (err) {
      // Handle error
      if (err.response) {
        setError("Error: " + (err.response.data.message || err.message));
      } else if (err.request) {
        setError("No response received from the server");
      } else {
        setError("Request failed: " + err.message);
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

      {/* Display error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
