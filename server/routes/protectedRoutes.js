const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authMiddleware');
const { authorizeRole } = require('../middleware/roleMiddleware');

router.get('/me', authenticateUser, (req, res) => {
  res.status(200).json({ message: 'You are authenticated', user: req.user });
});

router.get('/admin', authenticateUser, authorizeRole('admin'), (req, res) => {
  res.status(200).json({ message: 'Welcome, Admin!' });
});

module.exports = router;
