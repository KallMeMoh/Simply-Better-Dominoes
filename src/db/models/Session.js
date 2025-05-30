const { Schema, model } = require('mongoose');

const sessionSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      trim: true,
    },
    device: { type: String, required: true },
    ip_address: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model('Session', sessionSchema);
