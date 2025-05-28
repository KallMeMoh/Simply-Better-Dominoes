async function checkDatabaseConnection() {
  try {
    await yourDatabaseClient.ping();
    return '✅ Connected';
  } catch {
    return '❌ Not Connected';
  }
}

module.exports = checkDatabaseConnection;
