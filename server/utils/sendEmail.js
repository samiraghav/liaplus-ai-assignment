const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Writora" <${process.env.EMAIL_FROM}>`,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};

module.exports = sendEmail;
