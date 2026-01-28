import axios from "axios";

const API_BASE_URL = "http://localhost:3003/";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const taskService = {
  getTasks: async () => {
    try {
      const response = await api.get("getall");
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  },

  createTask: async (taskData) => {
    try {
      const response = await api.post("/create", taskData);
      return response.data;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  },
};

export default api;
