import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [userData, setUserData] = useState({
    username: '',
    name: '',
    address: '',
    email: '',
    role: '',
    contact: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!userData.username.trim()) newErrors.username = 'Username is required';
    if (!/^[a-zA-Z ]+$/.test(userData.name)) newErrors.name = 'Name must contain only letters and spaces';
    if (!userData.address.trim()) newErrors.address = 'Address is required';
    if (!userData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = 'Invalid email format';
    if (!['Admin', 'User'].includes(userData.role)) newErrors.role = 'Role must be Admin or User';
    if (!userData.contact.match(/^\d{10}$/)) newErrors.contact = 'Contact must be a 10-digit number';
    if (userData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(userData.password)) newErrors.password = 'Password must contain at least one uppercase letter';
    if (!/[a-z]/.test(userData.password)) newErrors.password = 'Password must contain at least one lowercase letter';
    if (!/[0-9]/.test(userData.password)) newErrors.password = 'Password must contain at least one number';
    if (!/[!@#$%^&*]/.test(userData.password)) newErrors.password = 'Password must contain at least one special character';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await axios.post('http://localhost:8080/api/v/user/saveuser', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      navigate('/'); // Redirect to login page after successful registration
    } catch (err) {
      setServerError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      {serverError && <p className="error">{serverError}</p>}
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={userData.username}
            onChange={handleChange}
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={userData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div className="form-group">
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={userData.address}
            onChange={handleChange}
          />
          {errors.address && <p className="error">{errors.address}</p>}
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <input
            type="text"
            name="role"
            placeholder="Role (Admin or User)"
            value={userData.role}
            onChange={handleChange}
          />
          {errors.role && <p className="error">{errors.role}</p>}
        </div>
        <div className="form-group">
          <input
            type="tel"
            name="contact"
            placeholder="Contact"
            value={userData.contact}
            onChange={handleChange}
          />
          {errors.contact && <p className="error">{errors.contact}</p>}
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <a href="/">Login</a>
      </p>
    </div>
  );
}

export default Signup;
