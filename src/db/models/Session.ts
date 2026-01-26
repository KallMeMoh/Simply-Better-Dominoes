import { Schema, model } from 'mongoose';

const sessionSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    device: { type: String, required: true },
    ip_address: { type: String, required: true },
  },
  { timestamps: true }
);

export default model('Session', sessionSchema);
