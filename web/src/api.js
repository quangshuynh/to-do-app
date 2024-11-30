import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const register = (data) => axios.post(`${API_URL}/register`, data);
export const login = (data) => axios.post(`${API_URL}/login`, data);
export const getTasks = () => axios.get(`${API_URL}/tasks`);
export const createTask = (data) => axios.post(`${API_URL}/tasks`, data);
