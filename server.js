const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

let todos = [
  { id: 1, task: 'Do laundry', completed: false },
  { id: 2, task: 'Clean room', completed: false }
];

app.get('/', (req, res) => {
  res.json('HI');
});
// GET /todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// POST /todos
app.post('/todos', (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    task: req.body.task,
    completed: false
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// GET /todos/:id
app.get('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send('Todo not found');
  res.json(todo);
});

// PUT /todos/:id
app.put('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send('Todo not found');
  todo.task = req.body.task;
  todo.completed = req.body.completed;
  res.json(todo);
});

// DELETE /todos/:id
app.delete('/todos/:id', (req, res) => {
  todos = todos.filter(t => t.id !== parseInt(req.params.id));
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
