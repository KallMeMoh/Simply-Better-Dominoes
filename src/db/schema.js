const { Schema, model } = require('mongoose');

// Define the user schema for game players
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  xp: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = {
  User: model('User', userSchema),
};
