export function formateUptime(inputSeconds) {
  if (typeof inputSeconds !== 'number' || inputSeconds < 0) {
    throw new Error('Input must be a non-negative number');
  }
  const hours = Math.floor(inputSeconds / 3600);
  const minutes = Math.floor((inputSeconds % 3600) / 60);
  const seconds = Math.floor(inputSeconds % 60);
  return `${hours}h ${minutes}m ${seconds}s`;
}
