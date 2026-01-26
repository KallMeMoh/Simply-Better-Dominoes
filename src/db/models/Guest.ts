import { Schema, model } from 'mongoose';

const guestUserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
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
  },
  { timestamps: true }
);

export default model('Guest', guestUserSchema);
