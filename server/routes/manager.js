const express = require('express');
const Task = require('../models/Task');
const Timesheet = require('../models/Timesheet');
const { protect, isManager } = require('../middleware/authMiddleware');

const router = express.Router();

// Assign Task to Associate
router.post('/assign-task', protect, isManager, async (req, res) => {
  const { description, estimatedHours, taskDate, assignedTo } = req.body;
  const task = await Task.create({ description, estimatedHours, taskDate, assignedTo });
  res.json(task);
});

// View all associate timesheets
router.get('/timesheets', protect, isManager, async (req, res) => {
  const timesheets = await Timesheet.find().populate('taskId').populate('userId');
  res.json(timesheets);
});

module.exports = router;
