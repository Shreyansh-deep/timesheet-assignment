const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch {
    res.status(401).json({ msg: "Token invalid" });
  }
};

const isManager = (req, res, next) => {
  if (req.user.role !== "manager") return res.status(403).json({ msg: "Access denied" });
  next();
};

const isAssociate = (req, res, next) => {
  if (req.user.role !== "associate") return res.status(403).json({ msg: "Access denied" });
  next();
};

module.exports = { protect, isManager, isAssociate };
