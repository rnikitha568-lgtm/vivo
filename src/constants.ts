import { Song } from './types';

export const SONGS: Song[] = [
  {
    id: '1',
    title: 'Neon Horizon',
    artist: 'SynthAI',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration: 372,
  },
  {
    id: '2',
    title: 'Cyber Pulse',
    artist: 'GPT-Acoustics',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    duration: 425,
  },
  {
    id: '3',
    title: 'Midnight Grid',
    artist: 'DeepBeat',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    duration: 312,
  },
];

export const GRID_SIZE = 20;
export const INITIAL_SPEED = 150;
export const MIN_SPEED = 60;
export const SPEED_INCREMENT = 2;
