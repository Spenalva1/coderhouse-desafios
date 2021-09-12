const nodemailer = require('nodemailer');
const logger = require('./logger');

const ethTransporter = nodemailer.createTransport({
  host: process.env.MAIL_ETH_HOST,
  port: process.env.MAIL_ETH_PORT,
  auth: {
    user: process.env.MAIL_ETH_USER,
    pass: process.env.MAIL_ETH_PASS,
  },
});

const gmailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_GMAIL_USER,
    pass: process.env.MAIL_GMAIL_PASS,
  },
});

const formatedEmail = (text) => `
  <div style="
    border: 1px solid black;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px;
  ">
    <h2>Buenas!</h2>
    <p>${text}</p>
    <p>Spenalva</p>
  </div>
`;

const sendEmailEth = async (text, subject, to = process.env.MAIL_ETH_USER) => {
  try {
    await ethTransporter.sendMail({
      to,
      from: process.env.MAIL_ETH_USER,
      subject,
      html: formatedEmail(text),
    });
  } catch (error) {
    logger.log('error', `Error al enviar mail de sunto ${subject} a ${to}.`);
  }
};

const sendEmailGmail = async (
  text,
  subject,
  to = process.env.MAIL_GMAIL_USER,
  photo
) => {
  try {
    await gmailTransporter.sendMail({
      to,
      from: process.env.MAIL_GMAIL_USER,
      subject,
      html: formatedEmail(text),
      attachments: [
        {
          filename: 'profile.jpg',
          path: photo,
        },
      ],
    });
  } catch (error) {
    logger.log('error', `Error al enviar mail de sunto ${subject} a ${to}.`);
  }
};

module.exports = {
  sendEmailEth,
  sendEmailGmail,
};
