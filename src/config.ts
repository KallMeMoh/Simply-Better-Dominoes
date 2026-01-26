import { config } from 'dotenv';

config();

export const env = process.env['ENV'] || 'development';
export const port = process.env['PORT'] || 4001;
export const mongoURI = process.env['MONGO_URI'] || '';
export const jwt = {
  secret: process.env['JWT_SECRET'] || '',
  tokenExpiry: '30d',
};
