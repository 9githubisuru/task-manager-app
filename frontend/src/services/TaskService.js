import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8081/api/tasks",
});

export const getTasks = () => API.get("");

export const createTask = (task) => API.post("", task);

export const updateTask = (id, task) => API.put(`/${id}`, task);

export const deleteTask = (id) => API.delete(`/${id}`);

export const completeTask = (id) => API.patch(`/${id}/complete`);
