import mongoose from '../DB/connection.js'

const schema = mongoose.Schema({
  username: { type: String, require: true, max: 100 },
  password: { type: String, require: true },
});

const User = mongoose.model('users', schema);

export default User;