export default interface JWTPayload {
  userId: string;
  sessionId: string;
  tokenVersion: number;
}
