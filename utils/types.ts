export interface Song {
  id: string;
  name: string;
  path: string;
  title: string;
  singer: string;
  duration: number;
  progress?: number;
}

export interface MetaData {
  singer: string;
  title: string;
}

export type Repeat = "on" | "off" | "one";
