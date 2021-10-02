const nodemailer = require('nodemailer');
const {
  MAIL_ETH_HOST,
  MAIL_ETH_PORT,
  MAIL_ETH_USER,
  MAIL_ETH_PASS,
  MAIL_GMAIL_USER,
  MAIL_GMAIL_PASS,
} = require('../config/config.js');
const logger = require('./logger');

const ethTransporter = nodemailer.createTransport({
  host: MAIL_ETH_HOST,
  port: MAIL_ETH_PORT,
  auth: {
    user: MAIL_ETH_USER,
    pass: MAIL_ETH_PASS,
  },
});

const gmailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: MAIL_GMAIL_USER,
    pass: MAIL_GMAIL_PASS,
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

const sendEmailEth = async (text, subject, to = MAIL_ETH_USER) => {
  try {
    await ethTransporter.sendMail({
      to,
      from: MAIL_ETH_USER,
      subject,
      html: formatedEmail(text),
    });
  } catch (error) {
    logger.log('error', `Error al enviar mail de sunto ${subject} a ${to}.`);
  }
};

const sendEmailGmail = async (text, subject, to = MAIL_GMAIL_USER, photo) => {
  try {
    await gmailTransporter.sendMail({
      to,
      from: MAIL_GMAIL_USER,
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
