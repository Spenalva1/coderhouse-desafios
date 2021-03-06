const  mongoose = require('mongoose');

const schema = mongoose.Schema({
  author: { type: Object, require: true },
  message: { type: String, require: true },
  date: { type: String, require: true, max: 50 }
});

const Message = mongoose.model('messages', schema);

module.exports = Message;