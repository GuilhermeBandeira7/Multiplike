const app = require("./app");

class Task {
  constructor(id, descricao, dataVencimento, categoria, status = false) {
    this.id = id;
    this.descricao = descricao;
    this.dataVencimento = dataVencimento;
    this.categoria = categoria;
    this.status = status;
  }

  static validate(taskData) {
    const validCategories = ["trabalho", "pessoal", "estudos"];

    if (!taskData.descricao || typeof taskData.descricao !== "string") {
      return {
        valid: false,
        error: "Descrição é obrigatória e deve ser texto",
      };
    }

    if (!taskData.dataVencimento) {
      return { valid: false, error: "Data de vencimento é obrigatória" };
    }

    if (!taskData.categoria || !validCategories.includes(taskData.categoria)) {
      return {
        valid: false,
        error: "Categoria deve ser: trabalho, pessoal ou estudos",
      };
    }

    return { valid: true };
  }
}

const tasks = [
  new Task(1, "Estudar JavaScript", "2026-02-15", "estudos", false),
  new Task(2, "Entregar relatório", "2026-02-10", "trabalho", true),
  new Task(3, "Fazer compras", "2026-02-05", "pessoal", false),
];

let nextId = 4;

app.get("/status", (req, res) => {
  res.status(200).send("Hello world");
});

app.post("/create", (req, res) => {
  console.log(req);
  const validation = Task.validate(req.body);

  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  const newTask = new Task(
    nextId++,
    req.body.descricao,
    req.body.dataVencimento,
    req.body.categoria,
    req.body.status || false,
  );

  tasks.push(newTask);
  res.status(201).json({ message: "Tarefa criada com sucesso", task: newTask });
});

app.get("/getall", (req, res) => {
  res.status(200).json(tasks);
});

app.listen(3003, () => {
  console.log("server running on port 3003");
});
