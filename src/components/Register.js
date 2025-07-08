// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextBox } from 'devextreme-react/text-box';
import Button from 'devextreme-react/button';
import 'devextreme/dist/css/dx.light.css';
import './Register.css';

function Register() {
  const [user, setUser] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  // Update form values
  const handleInputChange = (field, value) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  // Register new user and store in localStorage
  const register = () => {
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    const emailExists = existingUsers.some(
      (u) => u.email.toLowerCase() === user.email.toLowerCase()
    );

    if (emailExists) {
      alert('Email already registered. Try logging in.');
      return;
    }

    const updatedUsers = [...existingUsers, user];
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    alert('Registration successful!');
    navigate('/');
  };

  return (
    <div className="register-container">
      <h2>Register</h2>

      <div className="form-group">
        <TextBox
          placeholder="Username"
          value={user.username}
          onValueChanged={(e) => handleInputChange('username', e.value)}
          stylingMode="outlined"
        />
      </div>

      <div className="form-group">
        <TextBox
          placeholder="Email"
          value={user.email}
          onValueChanged={(e) => handleInputChange('email', e.value)}
          stylingMode="outlined"
          mode="email"
        />
      </div>

      <div className="form-group">
        <TextBox
          placeholder="Password"
          value={user.password}
          onValueChanged={(e) => handleInputChange('password', e.value)}
          stylingMode="outlined"
          mode="password"
        />
      </div>

      <div className="form-group">
        <Button
          text="Register"
          type="success"
          stylingMode="contained"
          onClick={register}
        />
      </div>
    </div>
  );
}

export default Register;
