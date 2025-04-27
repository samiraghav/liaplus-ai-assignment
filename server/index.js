const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const blogRoutes = require('./routes/blogRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/blogs', blogRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT || 1234, () =>
      console.log(`Server running on port ${process.env.PORT || 1234}`)
    );
  })
  .catch((err) => console.error('MongoDB connection error:', err));
