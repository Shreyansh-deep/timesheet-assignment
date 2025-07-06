const express = require('express');
const Task = require('../models/Task');
const Timesheet = require('../models/Timesheet');
const { protect, isAssociate } = require('../middleware/authMiddleware');

const router = express.Router();

// View tasks assigned to associate
router.get('/my-tasks', protect, isAssociate, async (req, res) => {
  const tasks = await Task.find({ assignedTo: req.user._id });

  const timesheets = await Timesheet.find({
    userId: req.user._id,
    status: 'submitted'
  });

  const submittedTaskIds = timesheets.map(ts => ts.taskId.toString());

  const enrichedTasks = tasks.map(task => ({
    ...task.toObject(),
    status: submittedTaskIds.includes(task._id.toString()) ? 'submitted' : 'draft'
  }));

  res.json(enrichedTasks);
});


// Add/update timesheet
router.post('/submit-timesheet', protect, isAssociate, async (req, res) => {
  const { taskId, actualHours, status } = req.body;

  let timesheet = await Timesheet.findOne({ taskId, userId: req.user._id });

  if (timesheet && timesheet.status === 'submitted') {
    return res.status(400).json({ msg: 'Timesheet already submitted' });
  }

  if (!timesheet) {
    timesheet = new Timesheet({ taskId, userId: req.user._id });
  }

  timesheet.actualHours = actualHours;
  timesheet.status = status;

  await timesheet.save();
  res.json(timesheet);
});

module.exports = router;
