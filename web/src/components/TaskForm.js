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
  IconButton,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const TaskForm = ({ authToken, refreshTasks, handleLogout }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask({ title, description }, authToken);
      setTitle('');
      setDescription('');
      refreshTasks(); // Refresh task list
    } catch (err) {
      console.error('Failed to create task', err);
    }
  };

  return (
    <Container maxWidth="sm">
      {/* Top AppBar */}
      <AppBar position="static" sx={{ marginBottom: 3 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Task Manager
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
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
