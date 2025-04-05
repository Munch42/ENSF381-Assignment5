import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
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
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const users = await res.json();
      const validUser = users.find(
        (user) => user.username === username && user.email === password
      );

      if (validUser) {
        setStatusType("success");
        setStatusMessage("Login successful! Redirecting to Courses...");
      } else {
        setStatusType("error");
        setStatusMessage("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setStatusType("error");
      setStatusMessage("Login failed. Please try again later.");
    }
  };

  useEffect(() => {
    if (statusType === "success") {
      const timer = setTimeout(() => {navigate("/courses");}, 2000);
      return () => clearTimeout(timer);
    }
  }, [statusType, navigate]);
  
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
          </form>
        </div>
        <br></br>
        <AuthMessage /> 
      </div>
    </AuthContext.Provider>
  );
};

export default LoginForm;
