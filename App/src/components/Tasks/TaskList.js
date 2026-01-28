"use client";

import { useState } from "react";
import { useTasks } from "@/hooks/useTasks";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import styles from "./TaskList.module.css";

export default function TaskList() {
  const [filter, setFilter] = useState("todas");
  const { tasks, loading, error, addTask, toggleComplete, deleteTask } =
    useTasks();

  const handleAddTask = async (newTaskData) => {
    try {
      await addTask(newTaskData);
    } catch (err) {
      alert("Erro ao criar tarefa: " + err.message);
    }
  };

  const handleToggleComplete = async (taskId) => {
    try {
      await toggleComplete(taskId);
    } catch (err) {
      alert("Erro ao atualizar tarefa: " + err.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
    } catch (err) {
      alert("Erro ao deletar tarefa: " + err.message);
    }
  };

  const getFilteredTasks = () => {
    switch (filter) {
      case "completas":
        return tasks.filter((task) => task.completed);
      case "pendentes":
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();
  const completedCount = tasks.filter((task) => task.completed).length;

  if (loading) {
    return (
      <div className={styles.container}>
        <p className={styles.loadingState}>Carregando tarefas...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>📋 Minhas Tarefas</h1>
        <p className={styles.stats}>
          Total: {tasks.length} | Concluídas: {completedCount} | Pendentes:{" "}
          {tasks.length - completedCount}
        </p>
      </header>

      {error && (
        <div className={styles.errorMessage}>
          ⚠️ Erro ao carregar tarefas: {error}
        </div>
      )}

      <TaskForm onAddTask={handleAddTask} />

      <div className={styles.filterSection}>
        <h3>Filtrar por:</h3>
        <div className={styles.filterButtons}>
          <button
            className={`${styles.filterBtn} ${
              filter === "todas" ? styles.active : ""
            }`}
            onClick={() => setFilter("todas")}
          >
            Todas ({tasks.length})
          </button>
          <button
            className={`${styles.filterBtn} ${
              filter === "pendentes" ? styles.active : ""
            }`}
            onClick={() => setFilter("pendentes")}
          >
            Pendentes ({tasks.length - completedCount})
          </button>
          <button
            className={`${styles.filterBtn} ${
              filter === "completas" ? styles.active : ""
            }`}
            onClick={() => setFilter("completas")}
          >
            Completas ({completedCount})
          </button>
        </div>
      </div>

      <div className={styles.tasksList}>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={handleToggleComplete}
              onDeleteTask={handleDeleteTask}
            />
          ))
        ) : (
          <p className={styles.emptyState}>
            {filter === "todas" && "Nenhuma tarefa criada ainda"}
            {filter === "pendentes" && "Nenhuma tarefa pendente"}
            {filter === "completas" && "Nenhuma tarefa completa"}
          </p>
        )}
      </div>
    </div>
  );
}
