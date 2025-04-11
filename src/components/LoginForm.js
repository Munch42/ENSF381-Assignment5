import React, { useState, useEffect, createContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthMessage from "./AuthMessage";
import "./LoginForm.css";

export const AuthContext = createContext();

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [statusType, setStatusType] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setStatusType("error");
      setStatusMessage("Username and password cannot be empty.");
      return;
    }

    if (password.length < 8) {
      setStatusType("error");
      setStatusMessage("Password must be at least 8 characters.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok) {
        setStatusType("success");
        setStatusMessage("Login successful! Redirecting to Courses...");
        // Optionally store user ID or token here: data.student_id
        setTimeout(() => navigate("/courses"), 2000);
      } else {
        setStatusType("error");
        setStatusMessage(data.message || "Invalid credentials.");
      }
    } catch (err) {
      setStatusType("error");
      setStatusMessage("Login failed. Please try again later.");
    }
  };

  return (
    <AuthContext.Provider value={{ statusType, statusMessage }}>
      <div id="login-main">
        <h2>LMS Login</h2>
        <div id="login">
          <form onSubmit={handleLogin}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div id="login-submit">
              <button type="submit">Login</button>
            </div>

            <a href="#">Forgot Password?</a>
            <Link to="/signup">Don't have an account? Sign up here</Link>
          </form>
        </div>
        <br />
        <AuthMessage /> 
      </div>
    </AuthContext.Provider>
  );
}

export default LoginForm;
