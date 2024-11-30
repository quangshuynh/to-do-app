import React, { useEffect, useState } from 'react';
import { getTasks } from '../api';
import TaskForm from './TaskForm';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  Box,
} from '@mui/material';

const TaskList = ({ authToken }) => {
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
    <Container maxWidth="md">
      <TaskForm authToken={authToken} refreshTasks={fetchTasks} />
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {tasks.map((task) => (
            <Grid item xs={12} sm={6} key={task.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {task.title}
                  </Typography>
                  <Typography color="text.secondary">{task.description}</Typography>
                  <Typography
                    color={task.status === 'complete' ? 'green' : 'error'}
                  >
                    {task.status}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default TaskList;
