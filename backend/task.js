const mongoose = require('mongoose');

// Define Task Schema
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  time: String,
});

// Create Task model
const Task = mongoose.model('Task', taskSchema);

// Export Task model
module.exports = Task;
