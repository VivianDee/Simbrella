import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/HomePage/Homepage";
import SignupPage from "./pages/Auth/SignupPage";
import LoginPage from "./pages/Auth/LoginPage";
import { StoreProvider } from "./hooks/stores";

const App = () => {
  return (
    <StoreProvider>
      
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<Homepage />} />
        </Routes>
      </Router>
    </StoreProvider>
  );
};

export default App;
