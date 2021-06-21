import { FileNode, FileNodeMode } from '@app/entities';

export const fileNodeMap: Record<string, FileNode> = {
  '/': {
    path: '/',
    children: [],
    stat: {
      size: 0,
      mode: FileNodeMode.DIR,
    },
    sha: '',
    content: null,
    url: '',
  },
};
