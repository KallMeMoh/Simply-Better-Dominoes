const mongoose = require('mongoose');
const { mongooseURI } = require('../config.js');
const { env } = require('../config.js');

/**
 * Connects to the MongoDB database using the provided URI.
 * Logs the connection status or errors based on the environment.
 * @async
 * @returns {Promise<void>} Resolves when the connection is successful.
 */
const connectDB = async () => {
  try {
    await mongoose.connect(mongooseURI);
    console.log('MongoDB Connected');
  } catch (err) {
    if (env === 'development') {
      console.error(
        'MongoDB Connection Error:',
        err.message,
        '\nStack Trace:',
        err.stack
      );
    } else {
      console.error(
        `MongoDB Connection Error: An error occurred while connecting to the database. [Timestamp: ${new Date().toISOString()}]`
      );
    }
  }
};

/**
 * Pings the MongoDB database to measure the response time.
 * Logs the ping time or errors based on the environment.
 * @async
 * @returns {Promise<number>} Resolves with the ping time in milliseconds.
 */
const pingDB = async () => {
  try {
    const start = process.hrtime();

    await mongoose.connection.db.command({ ping: 1 });

    const end = process.hrtime(start);
    const pingTimeMs = end[0] * 1000 + end[1] / 1e6;

    return pingTimeMs.toFixed(2);
  } catch (err) {
    if (env === 'development') {
      console.error(
        'MongoDB Ping Error:',
        err.message,
        '\nStack Trace:',
        err.stack
      );
    } else {
      console.error(
        `MongoDB Ping Error: An error occurred while pinging the database. [Timestamp: ${new Date().toISOString()}]`
      );
    }
    return 'N/A';
  }
};

module.exports = { connectDB, pingDB };
