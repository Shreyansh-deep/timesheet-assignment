const mongoose = require('mongoose');

const timesheetSchema = new mongoose.Schema({
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  actualHours: Number,
  status: { type: String, enum: ['draft', 'submitted'], default: 'draft' }
});

module.exports = mongoose.model('Timesheet', timesheetSchema);
