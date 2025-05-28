async function measureLatency() {
  const start = Date.now();
  return Date.now() - start;
}

module.exports = measureLatency;
