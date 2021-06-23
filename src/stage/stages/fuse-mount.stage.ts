import { ParamsContext } from '@app/params';
import { Api } from '@app/shared/api';
import { fileNodeMap } from '@app/store';
import Debug from 'debug';
import Fuse from 'fuse-native';
import type { FuseOperations } from 'fuse-native';
import { injectable, inject } from 'inversify';
import { Stage } from '../interfaces';

const debug = Debug('ghmount:fuse-mount');

@injectable()
export class FuseMountStage implements Stage {
  label = 'Mount';

  private ops: FuseOperations = {
    readdir: function (path, cb) {
      debug('readdir(%s)', path);
      return process.nextTick(cb, 0, fileNodeMap[path]?.children || []);
    },
    getattr: function (path, cb) {
      // console.log('getattr(%s)', path);
      if (!fileNodeMap[path]) {
        return process.nextTick(cb, Fuse.ENOENT);
      }

      return process.nextTick(cb, 0, fileNodeMap[path].stat);
    },
    open: async (path, flags, cb) => {
      debug('open(%s, %d)', path, flags);
      const { sha, content } = fileNodeMap[path];
      if (!content) {
        const { repoPath } = this.context;
        const url = `/repos/${repoPath}/git/blobs/${sha}`;
        const { data } = await this.api.octokit.request(`GET ${url}`);
        fileNodeMap[path].content = Buffer.from(data.content, 'base64');
      }
      return process.nextTick(cb, 0);
    },
    read: async (path, fd, buf, len, pos, cb) => {
      debug('read(%s, %d, %d, %d)', path, fd, len, pos);
      const contentBuffer = (fileNodeMap[path].content as Buffer).slice(
        pos,
        pos + len,
      );
      buf.fill(contentBuffer);
      return process.nextTick(cb, len);
    },
  };

  constructor(
    @inject(ParamsContext) private context: ParamsContext,
    @inject(Api) private api: Api,
  ) {}

  async run(): Promise<void> {
    const { mntPath } = this.context;

    const fuse = new Fuse(mntPath, this.ops, {
      debug: false,
      displayFolder: true,
      mkdir: true,
    });
    fuse.mount((err) => {
      if (err) throw err;
      debug('mounted:', fuse.mnt);
    });

    process.once('SIGINT', function () {
      fuse.unmount((err) => {
        if (err) {
          throw err;
        }
        debug('unmounted:', fuse.mnt);
      });
    });
  }
}
