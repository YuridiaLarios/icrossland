const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  authId: String,
  username: String,
  email: String,
  thumbnailFile: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
