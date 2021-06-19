export interface FileNode {
  path: string;
  children: string[];
  stat: {
    mode: FileNodeMode;
    size: number;
  };
  url: string;
}

export enum FileNodeMode {
  FILE = 33188,
  DIR = 16877,
}
