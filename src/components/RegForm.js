import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './RegForm.css';

function RegForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: ''
  });

  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState("");

  const validate = () => {
    const newErrors = {};
    const usernameRegex = /^[A-Za-z][A-Za-z0-9_-]{2,19}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\[\]{}|;:'",.<>?/`~]).{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|io)$/i;
  
    if (!usernameRegex.test(formData.username)) {
      newErrors.username = "Username must start with a letter and be 3–20 characters (letters, numbers, _ or - allowed)";
    }
  
    if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Password must be at least 8 characters and include uppercase, lowercase, number, and special character";
    }
  
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
  
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid Email Format";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerMessage("");

    if (!validate()) return;

    try {
      const res = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok) {
        setServerMessage("Signup successful! Redirecting to login...");
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setServerMessage(data.message || "Signup failed.");
      }
    } catch (error) {
      setServerMessage("Could not connect to server.");
    }
  };

  return (
    <div id="signup-main">
      <h2>Sign Up</h2>

      <div id="signup">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <button type="submit">Sign Up</button>
        </form>
      </div>

      {Object.keys(errors).length > 0 && (
        <div id="signup-error-box">
          <ul>
            {Object.values(errors).map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

      {serverMessage && (
        <div id="signup-message">
          {serverMessage}
        </div>
      )}

      <div id="signup-login-link">
        <Link to="/login">Already have an account? Login here</Link>
      </div>
    </div>
  );
}

export default RegForm;
