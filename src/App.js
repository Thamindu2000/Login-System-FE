import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import HomePage from './pages/HomePage';
import UserManagementF from './components/UserManagementF';
import React from 'react';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/usermanagementf" element={<UserManagementF />} />
          
          </Routes>
      </div>
    </Router>
  
  );
}

export default App;