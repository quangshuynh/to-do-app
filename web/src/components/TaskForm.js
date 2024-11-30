import React, { useState } from 'react';
import { createTask } from '../api';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Paper,
  AppBar,
  Toolbar,
} from '@mui/material';

const TaskForm = ({ authToken, refreshTasks, handleLogout }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ title, description }); // Log the input data
  
    try {
      const response = await createTask({ title, description }, authToken);
      console.log("Task created:", response.data); // Log the API response
      setTitle('');
      setDescription('');
      refreshTasks(); // Refresh the task list
    } catch (err) {
      console.error("Error adding task:", err.response?.data || err.message);
    }
  };  
  

  return (
    <Container maxWidth="sm">
      {/* Top AppBar */}
      <AppBar position="static" sx={{ marginBottom: 3 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Task Adder
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Task Form */}
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Add a New Task
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Task Title"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            label="Description"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Add Task
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default TaskForm;
