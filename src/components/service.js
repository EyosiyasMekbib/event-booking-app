import axios from 'axios';

const API_URL = 'https://5z9sttfs-8080.euw.devtunnels.ms/api';

const authHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export const signin = async (username, password) => {
  const response = await axios.post(`${API_URL}/auth/signin`, { username, password });
  return response.data;
};

export const signup = async (username, email, password, role) => {
  const response = await axios.post(`${API_URL}/auth/signup`, { username, email, password, role });
  return response.data;
};

export const fetchCurrentUser = async (token) => {
  const response = await axios.get(`${API_URL}/auth/me`, authHeaders(token));
  console.log(response.data);
  return response.data;
};

export const updateUser = async (token, userData) => {
  const response = await axios.post(`${API_URL}/auth/update`, userData, authHeaders(token));
  return response.data;
};

export const fetchExercises = async (token) => {
  const response = await axios.get(`${API_URL}/exercises/all`, authHeaders(token));
  return response.data;
};

export const addExercise = async (token, exercise) => {
  const response = await axios.post(`${API_URL}/exercises`, exercise, authHeaders(token));
  return response.data;
};

export const fetchUserWorkouts = async (token) => {
  const response = await axios.get(`${API_URL}/users/me/workouts`, authHeaders(token));
  return response.data;
};

export const addWorkout = async (token, workout) => {
  const response = await axios.post(`${API_URL}/users/me/workouts`, workout, authHeaders(token));
  return response.data;
};
