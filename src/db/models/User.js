const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
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
    wins: {
      type: Number,
      default: 0,
    },
    losses: {
      type: Number,
      default: 0,
    },
    games_played: {
      type: Number,
      default: 0,
    },
    highest_win_streak: {
      type: Number,
      default: 0,
    },
    token_version: { type: Number, default: 1 },
  },
  { timestamps: true }
);

module.exports = model('User', userSchema);
