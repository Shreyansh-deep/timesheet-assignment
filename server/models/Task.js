const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  description: String,
  estimatedHours: Number,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  taskDate: Date
});

module.exports = mongoose.model('Task', taskSchema);
