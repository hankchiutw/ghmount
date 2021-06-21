import { FileNode, FileNodeMode } from '@app/entities';
import { ParamsContext } from '@app/params';
import { Api } from '@app/shared/api';
import { injectable, inject } from 'inversify';

interface FileNodeRaw {
  path: string;
  type: string;
  size?: number;
  url?: string;
  mode: string;
  sha: string;
}

@injectable()
export class FetchFilesUsecase {
  constructor(
    @inject(Api) private api: Api,
    @inject(ParamsContext) private context: ParamsContext,
  ) {}

  async fetchRepo(): Promise<FileNode[]> {
    const { repoPath } = this.context;
    const result = await this.api.octokit.request(
      `GET /repos/${repoPath}/git/trees/master?recursive=1`,
    );

    const nodes = (result.data.tree as FileNodeRaw[]).map(toFileNode);

    return Promise.resolve(nodes);
  }
}

function toFileNode(raw: FileNodeRaw): FileNode {
  const { path, type, size, url, sha } = raw;
  return {
    path: `/${path}`,
    children: [],
    stat: {
      size: size || 0,
      mode: type === 'blob' ? FileNodeMode.FILE : FileNodeMode.DIR,
    },
    sha,
    content: null,
    url: url || '',
  };
}
