"use client";

import { useState } from "react";
import styles from "./TaskForm.module.css";

export default function TaskForm({ onAddTask }) {
  const [formData, setFormData] = useState({
    description: "",
    dueDate: "",
    category: "pessoal",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.description.trim()) {
      alert("Por favor, adicione uma descrição");
      return;
    }

    onAddTask({
      id: Date.now(),
      description: formData.description,
      dueDate: formData.dueDate,
      category: formData.category,
      completed: false,
    });

    setFormData({
      description: "",
      dueDate: "",
      category: "pessoal",
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Nova Tarefa</h2>

      <div className={styles.formGroup}>
        <label htmlFor="description">Descrição</label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descreva sua tarefa"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="dueDate">Data de Vencimento</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="category">Categoria</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="trabalho">Trabalho</option>
          <option value="pessoal">Pessoal</option>
          <option value="estudos">Estudos</option>
        </select>
      </div>

      <button type="submit" className={styles.submitBtn}>
        Adicionar Tarefa
      </button>
    </form>
  );
}
