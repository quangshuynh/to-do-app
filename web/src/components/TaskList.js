import React, { useEffect, useState } from 'react';
import { getTasks } from '../api';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  Box,
  CardActions,
  Button,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import TaskForm from './TaskForm';

const TaskList = ({ authToken, handleLogout }) => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await getTasks(authToken);
      setTasks(response.data); // Set tasks from API
    } catch (err) {
      console.error('Failed to fetch tasks', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Container>
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
      <TaskForm authToken={authToken} refreshTasks={fetchTasks} />

      {/* Task List */}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Your Tasks
        </Typography>
        <Grid container spacing={3}>
          {tasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task.id}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {task.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {task.description || 'No description'}
                  </Typography>
                  <Typography
                    variant="body2"
                    color={task.status === 'complete' ? 'green' : 'error'}
                    sx={{ marginTop: 1 }}
                  >
                    {task.status === 'complete' ? 'Completed' : 'Pending'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Edit
                  </Button>
                  <Button size="small" color="secondary">
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default TaskList;
