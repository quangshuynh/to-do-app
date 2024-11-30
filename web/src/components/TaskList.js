import React, { useEffect, useState } from 'react';
import { getTasks } from '../api';
import TaskForm from './TaskForm';

const TaskList = ({ authToken }) => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const response = await getTasks(authToken);
    setTasks(response.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <TaskForm authToken={authToken} refreshTasks={fetchTasks} />
      <h1>Your Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
