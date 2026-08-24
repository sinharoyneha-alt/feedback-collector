const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Local MongoDB connection (MongoDB Compass connects to the same local server)
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/feedback-collector';

const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});
const Feedback = mongoose.model('Feedback', feedbackSchema);

app.post('/api/feedback', async (req, res) => {
  try {
    const newFeedback = new Feedback(req.body);
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully');
    console.log('Database: feedback-collector');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
    console.error('Make sure MongoDB Server is installed and running on this computer.');
    process.exit(1);
  }
}

startServer();
