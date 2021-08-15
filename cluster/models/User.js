const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const schema = mongoose.Schema({
  username: { type: String, require: true, max: 100 },
  password: { type: String, require: false },
  facebookId: { type: String, require: false },
  email: { type: String, require: false },
  photo: { type: String, require: false },
});

schema.plugin(findOrCreate);

const User = mongoose.model('users', schema);

module.exports = User;