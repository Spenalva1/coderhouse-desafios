const Mongoose = require('mongoose');
const { MONGO_URL } = require('../config/config.js');

const connection = Mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

Mongoose.connection.on('connected', () => {
  console.log('[Mongoose] - connected in:', MONGO_URL);
});

Mongoose.connection.on('error', (err) => {
  console.log('[Mongoose] - error:', err);
});

module.exports = connection;
