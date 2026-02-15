
export interface CultureInsight {
  topic: string;
  content: string;
}

export enum PlayerState {
  PLAYING = 'PLAYING',
  PAUSED = 'PAUSED',
  LOADING = 'LOADING',
  ERROR = 'ERROR'
}
