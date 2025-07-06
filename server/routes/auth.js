const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect, isManager } = require('../middleware/authMiddleware');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword, role });
  res.status(201).json(user);
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const match = await bcrypt.compare(password, user.password);
  if (!user || !match) return res.status(401).json({ msg: "Invalid creds" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "2d" });
  res.json({ token, user });
});

// Get all users (only manager can access)
router.get('/users', protect, isManager, async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

module.exports = router;
