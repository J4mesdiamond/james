const express = require('express');
const router = express.Router();
const Task = require('./task');

// POST /api/tasks - Create a new task
router.post('/', async (req, res) => {
  const { title, description, date, time } = req.body;

  try {
    const newTask = new Task({ title, description, date, time });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create task', error: error.message });
  }
});

module.exports = router;
