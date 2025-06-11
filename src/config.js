require('dotenv').config();
module.exports = {
  port: process.env['PORT'] || 4001,
  mongooseURI: process.env['MONGO_URI'],
  jwt: {
    secret: process.env['JWT_SECRET'],
    token_expiry: '30d',
  },
  env: process.env['ENV'],
};
