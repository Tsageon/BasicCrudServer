const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

async function sendResetEmail(toEmail, resetLink) {
  const mailOptions = {
    from: MAIL_USER,
    to: toEmail,
    subject: 'Password Reset',
    text: `Click here to reset your password: ${resetLink}`
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendResetEmail }