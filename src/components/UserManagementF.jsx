import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation

function UserManagement() {
  const [userData, setUserData] = useState({
    username: '',
    name: '',
    address: '',
    email: '',
    contact: '',
    password: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation(); // To access the email passed from the login page
  const { email } = location.state || {}; // Extract email from navigation state

  useEffect(() => {
    const fetchUserData = async () => {
      if (!email) {
        setError('No email provided');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/api/v/user/getuserbyemail/${email}`);
        setUserData(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load user data');
      }
    };

    fetchUserData();
  }, [email]);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:8080/api/v/user/updateuser', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('User data updated successfully');
      setIsEditing(false); // Exit edit mode after saving
    } catch (err) {
      console.error(err);
      setError('Update failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>User Management</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={isEditing ? handleSave : (e) => e.preventDefault()}>
        {['username', 'name', 'address', 'email', 'contact', 'password'].map((field) => (
          <div className="form-group" key={field}>
            <input
              type={field === 'email' ? 'email' : field === 'password' ? 'password' : 'text'}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={userData[field]}
              onChange={handleChange}
              readOnly={!isEditing}
              required
            />
          </div>
        ))}

        {isEditing ? (
          <>
            <button type="submit">Save</button>
            |
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setIsEditing(true)} // Enable editing
          >
            Edit
          </button>
        )}
      </form>
      <button type="button" onClick={() => navigate(-1)} className="back-button">
        Back
      </button>
    </div>
  );
}

export default UserManagement;
