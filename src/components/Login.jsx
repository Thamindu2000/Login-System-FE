import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginSingup.css';


function Login() {
  const [credentials, setCredentials] = useState({
    
    email: '',
    password: '',
    
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post('http://localhost:8080/api/v/user/login', credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      navigate('/usermanagementf', { state: { email: credentials.email } }); // Redirect to User Management page
    } else {
      setError('Invalid credentials');
    }
  } catch (err) {
    setError('Invalid credentials');
  }
};

  return (
    <div className="auth-container">
      <h2>|_DAYTRIPPER_|</h2>
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
      <footer className="login-footer">
        <p>© 2024 DayTripper. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Login;
