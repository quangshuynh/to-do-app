import React, { useState } from 'react';
import { createTask } from '../api';

const TaskForm = ({ authToken, refreshTasks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask({ title, description }, authToken);
      setTitle('');
      setDescription('');
      refreshTasks(); // Refresh tasks after creation
    } catch (err) {
      console.error('Failed to create task', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Task</h2>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
