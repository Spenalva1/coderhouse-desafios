const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../' + process.env.NODE_ENV + '.env'),
});
const args = require('yargs').argv;

module.exports = {
  PORT: args.port || process.env.PORT || 8080,
  MONGO_URL: process.env.MONGO_URL,
  CLUSTER_MODE: process.env.CLUSTER_MODE || 'FORK',
  FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
  FACEBOOK_APP_KEY: process.env.FACEBOOK_APP_KEY,
  FACEBOOK_CALLBACK_URL: process.env.FACEBOOK_CALLBACK_URL,
  MAIL_ETH_HOST: process.env.MAIL_ETH_HOST,
  MAIL_ETH_PORT: process.env.MAIL_ETH_PORT,
  MAIL_ETH_USER: process.env.MAIL_ETH_USER,
  MAIL_ETH_PASS: process.env.MAIL_ETH_PASS,
  MAIL_GMAIL_USER: process.env.MAIL_GMAIL_USER,
  MAIL_GMAIL_PASS: process.env.MAIL_GMAIL_PASS,
  TWILIO_SID: process.env.TWILIO_SID,
  TWILIO_TOKEN: process.env.TWILIO_TOKEN,
  TWILIO_NUMBER: process.env.TWILIO_NUMBER,
  TWILIO_ADMIN_NUMBER: process.env.TWILIO_ADMIN_NUMBER,
  PERSISTENCE_MODE: process.env.PERSISTENCE_MODE || 'MONGO',
  SQL_HOST: process.env.SQL_HOST,
  SQL_USER: process.env.SQL_USER,
  SQL_PASSWORD: process.env.SQL_PASSWORD,
  SQL_DATABASE: process.env.SQL_DATABASE,
};
