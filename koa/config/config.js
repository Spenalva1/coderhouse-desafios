require('dotenv/config');

module.exports = {
  PORT: process.argv[3] || process.env.PORT || 8080,
  PERSISTENCE_MODE: process.env.PERSISTENCE_MODE || 'Mongo',
  MONGO_URL: process.env.MONGO_URL,
};
