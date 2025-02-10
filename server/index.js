const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const port = 3000; // You can change this port if needed

// Enable CORS for all origins (for development purposes)
app.use(cors());

// Connect to MongoDB
//mongoose.connect('mongodb://localhost:27017/shared-board', {
//https://mongodb-ocus.onrender.com
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB!');
});

// Define Mongoose schema for post-it notes
const postItSchema = new mongoose.Schema({
  content: String,
  positionX: Number,
  positionY: Number,
});

const PostIt = mongoose.model('PostIt', postItSchema, "pPostIts");

// GET /post-its endpoint
app.get('/post-its', async (req, res) => {
  try {
    const postItNotes = await PostIt.find();
    res.json(postItNotes);
  } catch (error) {
    console.error('Error retrieving post-it notes:', error);
    res.status(500).json({ message: 'Error retrieving post-it notes' });
  }
});

// POST /post-its endpoint
app.post('/post-its', async (req, res) => {
  try {
    const { content, positionX, positionY } = req.body;
    const newPostIt = new PostIt({ content, positionX, positionY });
    await newPostIt.save();
    res.status(201).json(newPostIt);
  } catch (error) {
    console.error('Error creating post-it note:', error);
    res.status(500).json({ message: 'Error creating post-it note' });
  }
});

// DELETE /post-its/:id endpoint
app.delete('/post-its/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await PostIt.findByIdAndDelete(id);
    res.status(204).send(); // 204 No Content
  } catch (error) {
    console.error('Error deleting post-it note:', error);
    res.status(500).json({ message: 'Error deleting post-it note' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});