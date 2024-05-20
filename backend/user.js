const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  tagName: String  // Add this if you plan to use tagName in your user profiles
});

module.exports = mongoose.model('User', userSchema);
