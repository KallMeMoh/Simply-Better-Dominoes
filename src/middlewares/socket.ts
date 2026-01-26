const connectionAttempts = new Map(); // IP -> {count, timestamp}

export async function socketRateLimiiter(socket, next) {
  const ip = socket.handshake.address;
  const now = Date.now();
  const windowMs = 60000;
  const maxAttempts = 10;

  const record = connectionAttempts.get(ip) || { count: 0, timestamp: now };

  // Reset window if expired
  if (now - record.timestamp > windowMs) {
    connectionAttempts.set(ip, { count: 1, timestamp: now });
    return next();
  }

  // Check limit
  if (record.count >= maxAttempts) {
    console.log(`Rate limit hit for IP: ${ip}`);
    return next(
      new Error('Too many connection attempts. Please wait a minute.'),
    );
  }

  record.count++;
  connectionAttempts.set(ip, record);
  next();
}
