const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample data
let notes = [
  { id: 1, title: 'Note 1', text: 'This is note 1' },
  { id: 2, title: 'Note 2', text: 'This is note 2' },
];

// GET /notes route to return the notes
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

// Other routes, like POST /notes, DELETE /notes/:id, etc.
app.post('/api/notes', (req, res) => {
  const newNote = {
    id: notes.length + 1,
    title: req.body.title,
    text: req.body.text,
  };
  notes.push(newNote);
  res.json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
  notes = notes.filter(note => note.id !== parseInt(req.params.id));
  res.json({ success: true });
});

// Serve the front-end (HTML/CSS/JS)
app.use(express.static('public'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});