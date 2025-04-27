const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 12);

    const emailVerificationToken = crypto.randomBytes(32).toString('hex');
    const emailVerificationExpires = Date.now() + 15 * 60 * 1000; // 15 min

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      emailVerificationToken,
      emailVerificationExpires,
    });

    await user.save();

    const verifyLink = `${process.env.CLIENT_URL}/verify-email?token=${emailVerificationToken}&email=${email}`;

    await sendEmail({
      to: email,
      subject: 'Verify Your Email',
      html: `<p>Click <a href="${verifyLink}">here</a> to verify your email. This link will expire in 15 minutes.</p>`,
    });

    res.status(201).json({
      message:
        'Signup successful. Please check your email to verify your account.',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.verifyEmail = async (req, res) => {
  const { token, email } = req.query;

  const user = await User.findOne({ email });

  if (
    !user ||
    user.isVerified ||
    user.emailVerificationToken !== token ||
    user.emailVerificationExpires < Date.now()
  ) {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }

  user.isVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;
  await user.save();

  res
    .status(200)
    .json({ message: 'Email successfully verified. You can now login.' });
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' });

    if (!user.isVerified)
      return res
        .status(403)
        .json({ message: 'Please verify your email before logging in.' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
