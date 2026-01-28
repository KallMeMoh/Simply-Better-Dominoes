import { config } from 'dotenv';

config();

function getRequiredEnv(key: string) {
  const value = process.env[key];
  if (!value) throw new Error(`${key} enviroment variable was not loaded`);

  return value;
}

export const env = process.env['ENV'] || 'development';
export const port = process.env['PORT'] || 4000;
export const mongoURI = getRequiredEnv('MONGO_URI');
export const jwt = {
  secret: getRequiredEnv('JWT_SECRET'),
  tokenExpiry: '30d' as const,
};
