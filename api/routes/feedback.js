// /api/routes/feedback.js

const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// Rota GET para obter todos os feedbacks
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ created_at: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota POST para criar um novo feedback
router.post('/', async (req, res) => {
  const feedback = new Feedback({
    name: req.body.name,
    email: req.body.email,
    rating: req.body.rating,
    message: req.body.message,
  });

  try {
    const newFeedback = await feedback.save();
    res.status(201).json(newFeedback);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
