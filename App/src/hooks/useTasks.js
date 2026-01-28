import { useState, useEffect } from "react";
import { taskService } from "@/services/api";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskService.getTasks();
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to fetch tasks");
      console.error("Fetch tasks error:", err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    try {
      const newTask = await taskService.createTask(taskData);
      setTasks((prev) => [newTask, ...prev]);
      return newTask;
    } catch (err) {
      setError(err.message || "Failed to create task");
      console.error("Add task error:", err);
      throw err;
    }
  };

  const toggleComplete = async (taskId) => {
    try {
      const task = tasks.find((t) => t.id === taskId);
      if (!task) return;

      const updatedTask = await taskService.updateTask(taskId, {
        ...task,
        completed: !task.completed,
      });

      setTasks((prev) => prev.map((t) => (t.id === taskId ? updatedTask : t)));
    } catch (err) {
      setError(err.message || "Failed to update task");
      console.error("Toggle complete error:", err);
      throw err;
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    } catch (err) {
      setError(err.message || "Failed to delete task");
      console.error("Delete task error:", err);
      throw err;
    }
  };

  return {
    tasks,
    loading,
    error,
    addTask,
    toggleComplete,
    deleteTask,
    refetch: fetchTasks,
  };
}
