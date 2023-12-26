export interface Song {
  name: string;
  path: string;
  title: string;
  singer: string;
  duration: number;
  progress?: number;
}

export interface SongResponse {
  name: string;
  path: string;
}

export interface MetaData {
  singer: string;
  title: string;
}

export interface AudioElementInterface {
  src: string;
  onSongEnd: () => void;
}
