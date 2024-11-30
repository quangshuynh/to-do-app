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
      <div>
        {authToken ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Navigate to="/login" />
        )}
        <Routes>
          <Route path="/login" element={<Login setAuthToken={setAuthToken} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/tasks"
            element={authToken ? <TaskList authToken={authToken} /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
