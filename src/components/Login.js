// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextBox } from 'devextreme-react/text-box';
import Button from 'devextreme-react/button';
import 'devextreme/dist/css/dx.light.css';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle user login
  const handleLogin = () => {
    // Get registered users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the entered credentials match any stored user
    const existingUser = storedUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (existingUser) {
      alert('Login successful!');
      navigate('/users'); // Navigate to User List page
    } else {
      alert('Login failed. Please check your email or password.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      <div className="form-group">
        <TextBox
          placeholder="Email"
          value={email}
          onValueChanged={(e) => setEmail(e.value)}
          stylingMode="outlined"
          mode="email"
        />
      </div>

      <div className="form-group">
        <TextBox
          placeholder="Password"
          value={password}
          onValueChanged={(e) => setPassword(e.value)}
          stylingMode="outlined"
          mode="password"
        />
      </div>

      <div className="form-group">
        <Button
          text="Login"
          type="success"
          stylingMode="contained"
          onClick={handleLogin}
        />
      </div>

      <p className="register-link" onClick={() => navigate('/register')}>
        New user? <span>Register here</span>
      </p>
    </div>
  );
}

export default Login;
