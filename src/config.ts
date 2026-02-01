import { config } from 'dotenv';

config();

function getRequiredEnv(key: string) {
  const value = process.env[key];
  if (!value) throw new Error(`${key} enviroment variable was not loaded`);

  return value;
}

export const env = getRequiredEnv('NODE_ENV');
export const port = process.env['PORT'] || 3000;
export const mongoURI = getRequiredEnv('MONGO_URI');
export const jwt = {
  secret: getRequiredEnv('JWT_SECRET'),
  tokenExpiry: '30d' as const,
};

console.info(`RUNNING IN ${env.toUpperCase()} MODE`);
