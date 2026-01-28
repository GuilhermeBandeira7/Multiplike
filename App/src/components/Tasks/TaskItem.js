"use client";

import styles from "./TaskItem.module.css";

export default function TaskItem({ task, onToggleComplete, onDeleteTask }) {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  };

  const getCategoryColor = (category) => {
    const colors = {
      trabalho: "#FF6B6B",
      pessoal: "#4ECDC4",
      estudos: "#45B7D1",
    };
    return colors[category] || "#95E1D3";
  };

  return (
    <div
      className={`${styles.taskItem} ${task.completed ? styles.completed : ""}`}
    >
      <div className={styles.taskContent}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          className={styles.checkbox}
        />

        <div className={styles.taskInfo}>
          <h3 className={styles.description}>{task.description}</h3>

          <div className={styles.details}>
            {task.dueDate && (
              <span className={styles.dueDate}>
                📅 {formatDate(task.dueDate)}
              </span>
            )}

            <span
              className={styles.category}
              style={{ backgroundColor: getCategoryColor(task.category) }}
            >
              {task.category}
            </span>

            <span className={styles.status}>
              {task.completed ? "✅ Concluída" : "⏳ Pendente"}
            </span>
          </div>
        </div>
      </div>

      <button
        className={styles.deleteBtn}
        onClick={() => onDeleteTask(task.id)}
        title="Deletar tarefa"
      >
        🗑️
      </button>
    </div>
  );
}
