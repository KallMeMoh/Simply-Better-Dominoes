import mongoose from 'mongoose';
import { mongoURI } from '../config.js';

export async function connectDB() {
  await mongoose.connect(mongoURI);
  console.log('MongoDB Connected');
}

export async function pingDB(): Promise<string> {
  try {
    const start = performance.now();

    await mongoose.connection.db?.command({ ping: 1 });

    const pingTimeMs = performance.now() - start;

    return pingTimeMs.toFixed(0);
  } catch (err) {
    console.error(err);
    return 'N/A';
  }
}
