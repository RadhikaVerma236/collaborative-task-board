import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getTasks = () => {
  return axios.get(API_URL, getAuthHeaders());
};

export const createTask = (taskData) => {
  return axios.post(API_URL, taskData, getAuthHeaders());
};

export const updateTask = (taskId, taskData) => {
  return axios.patch(
    `${API_URL}/${taskId}`,
    taskData,
    getAuthHeaders()
  );
};

export const updateTaskStatus = (taskId, status) => {
  return axios.patch(
    `${API_URL}/${taskId}/status`,
    { status },
    getAuthHeaders()
  );
};

export const deleteTask = (taskId) => {
  return axios.delete(
    `${API_URL}/${taskId}`,
    getAuthHeaders()
  );
};