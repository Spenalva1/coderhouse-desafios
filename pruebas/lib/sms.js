const client = require('twilio')(
  process.env.TWILIO_SID,
  process.env.TWILIO_TOKEN
);
const logger = require('./logger');

sendAdminSms = async (emisor, message) => {
  try {
    await client.messages.create({
      body: `Mensaje para Admin de ${emisor}: ${message}`,
      from: process.env.TWILIO_NUMBER,
      to: process.env.TWILIO_ADMIN_NUMBER,
    });
  } catch (error) {
    logger.log('error', `Error al enviar sms de Administrador de ${emisor}.`);
  }
};

module.exports = sendAdminSms;
