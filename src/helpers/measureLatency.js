exports.measureLatency = async () => {
  const start = Date.now();
  return Date.now() - start;
};
