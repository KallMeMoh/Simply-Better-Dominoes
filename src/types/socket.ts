// src/types/socket.ts

export interface ServerToClientEvents {
  updateScore: (data: { playerId: string; score: number }) => void;
  playerJoined: (username: string) => void;
  // Add your existing events here...
}

export interface ClientToServerEvents {
  move: (direction: 'up' | 'down' | 'left' | 'right') => void;
  sendMessage: (msg: string) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  username: string;
  userId: string;
}
