const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { authenticateUser } = require('../middleware/authMiddleware');
const { authorizeRole } = require('../middleware/roleMiddleware');

router.get('/', blogController.getBlogs);

router.post(
  '/',
  authenticateUser,
  authorizeRole('admin'),
  blogController.createBlog
);
router.put(
  '/:id',
  authenticateUser,
  authorizeRole('admin'),
  blogController.updateBlog
);
router.delete(
  '/:id',
  authenticateUser,
  authorizeRole('admin'),
  blogController.deleteBlog
);

module.exports = router;
