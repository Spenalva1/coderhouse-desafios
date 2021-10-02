const {
  TWILIO_SID,
  TWILIO_TOKEN,
  TWILIO_NUMBER,
  TWILIO_ADMIN_NUMBER,
} = require('../config/config.js');
const client = require('twilio')(TWILIO_SID, TWILIO_TOKEN);
const logger = require('./logger');

sendAdminSms = async (emisor, message) => {
  try {
    await client.messages.create({
      body: `Mensaje para Admin de ${emisor}: ${message}`,
      from: TWILIO_NUMBER,
      to: TWILIO_ADMIN_NUMBER,
    });
  } catch (error) {
    logger.log('error', `Error al enviar sms de Administrador de ${emisor}.`);
  }
};

module.exports = sendAdminSms;
