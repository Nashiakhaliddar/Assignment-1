const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); // to read JSON from request body

// Array to store tasks
let tasks = [];
let currentId = 1;

// POST /addTask → Add new task
app.post('/addTask', (req, res) => {
  const { taskName } = req.body;
  if (!taskName) {
    return res.status(400).json({ error: 'Task name is required' });
  }
  const newTask = { id: currentId++, taskName };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// GET /tasks → Show all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// DELETE /task/:id → Delete task by ID
app.delete('/task/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== taskId);
  res.json({ message: `Task with ID ${taskId} deleted` });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
