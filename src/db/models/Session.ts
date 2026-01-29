import { Schema, model } from 'mongoose';

const sessionSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    device: { type: String, required: true },
    device_type: { type: String, required: true },
    os: { type: String, required: true },

    ip_address: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },

    suspicious: { type: Boolean, default: false },
  },
  { timestamps: true },
);

sessionSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 30 * 24 * 60 * 60 },
);

export default model('Session', sessionSchema);
