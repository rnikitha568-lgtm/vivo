export interface Song {
  id: string;
  title: string;
  artist: string;
  url: string;
  duration: number;
}

export type Point = {
  x: number;
  y: number;
};

export type GameState = 'IDLE' | 'PLAYING' | 'GAME_OVER';
