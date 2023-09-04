const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3001;

// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(cors());
// Sample data (replace with your own data store)
const items = [
  { id: 1, name: 'Item 1', description: 'This is Task 1' },
  { id: 2, name: 'Item 2', description: 'This is Task 2'  },
  { id: 3, name: 'Item 3', description: 'This is Task 3'  },
];

// GET all items
app.get('/items', (req, res) => {
  res.json(items);
});

// GET an item by ID
app.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find((i) => i.id === id);
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }
  res.json(item);
});

// POST a new item
app.post('/items', (req, res) => {
  const newItem = { id: items.length + 1, name: req.body.name, description: req.body.description };
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT (update) an item by ID
app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex((i) => i.id === id);
  if (itemIndex === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }
  if (req.body.name) {
    items[itemIndex].name = req.body.name;
  }
  if (req.body.description) {
    items[itemIndex].description = req.body.description;
  }
  res.json(items[itemIndex]);
});

// DELETE an item by ID
app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex((i) => i.id === id);
  if (itemIndex === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }
  const deletedItem = items.splice(itemIndex, 1);
  res.json(deletedItem[0]);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
