const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory todo list
let todos = [
  { id: 1, task: "Learn Node.js", completed: false },
  { id: 2, task: "Create a REST API", completed: false }
];

// GET all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// POST a new todo
app.post('/api/todos', (req, res) => {
  const newTodo = {
    id: Date.now(),
    task: req.body.task,
    completed: false
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT (update) a todo
app.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (!todo) return res.status(404).json({ message: 'Todo not found' });

  todo.task = req.body.task || todo.task;
  todo.completed = req.body.completed ?? todo.completed;
  res.json(todo);
});

// DELETE a todo
app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(t => t.id !== id);
  res.json({ message: 'Todo deleted' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
