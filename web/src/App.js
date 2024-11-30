import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';

const App = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

  const handleLogout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken'); // Clear token
  };

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<Login setAuthToken={setAuthToken} />} />
        {/* Register Route */}
        <Route path="/register" element={<Register />} />
        {/* Task List Route */}
        <Route
          path="/tasks"
          element={authToken ? <TaskList authToken={authToken} /> : <Navigate to="/login" />}
        />
        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
