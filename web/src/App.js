import React, { useState } from 'react';
import TaskList from './components/TaskList';
import Login from './components/Login';

const App = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

  const handleLogout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken');
  };

  return (
    <div>
      {authToken ? (
        <div>
          <button onClick={handleLogout}>Logout</button>
          <TaskList authToken={authToken} />
        </div>
      ) : (
        <Login setAuthToken={setAuthToken} />
      )}
    </div>
  );
};

export default App;
