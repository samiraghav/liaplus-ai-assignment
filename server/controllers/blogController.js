const Blog = require('../models/Blog');

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'name email');
    res.status(200).json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const author = req.user.id;

    const newBlog = new Blog({ title, content, author });
    await newBlog.save();

    const populatedBlog = await newBlog.populate('author', 'name email');

    res
      .status(201)
      .json({ message: 'Blog created successfully', blog: populatedBlog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!updatedBlog)
      return res.status(404).json({ message: 'Blog not found' });

    res.status(200).json({ message: 'Blog updated', blog: updatedBlog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog)
      return res.status(404).json({ message: 'Blog not found' });

    res.status(200).json({ message: 'Blog deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
