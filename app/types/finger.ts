export interface Finger {
  id: number;
  x: number;
  y: number;
  color: string;
}

export type GameStatus = 'waiting' | 'countdown' | 'finished';
