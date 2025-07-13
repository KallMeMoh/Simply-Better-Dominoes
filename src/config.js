import dotenv from 'dotenv';
dotenv.config();

export const env = process.env['ENV'];
export const port = process.env['PORT'] || 4001;
export const mongooseURI = process.env['MONGO_URI'];
export const jwt = {
  secret: process.env['JWT_SECRET'],
  tokenExpiry: '30d',
};

const config = {
  env,
  port,
  mongooseURI,
  jwt,
};

export default config;
