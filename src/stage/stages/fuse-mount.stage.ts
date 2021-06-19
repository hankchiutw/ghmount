import { ParamsContext } from '@app/params';
import { fileNodeMap } from '@app/store';
import Fuse from 'fuse-native';
import type { FuseOperations } from 'fuse-native';
import { injectable, inject } from 'inversify';
import { Stage } from '../interfaces';

const ops: FuseOperations = {
  readdir: function (path, cb) {
    console.log('readdir(%s)', path);
    return process.nextTick(cb, 0, fileNodeMap[path]?.children || []);
  },
  getattr: function (path, cb) {
    console.log('getattr(%s)', path);
    if (!fileNodeMap[path]) {
      return process.nextTick(cb, Fuse.ENOENT);
    }

    return process.nextTick(cb, 0, fileNodeMap[path].stat);
  },
  read: function (path, fd, buf, len, pos, cb) {
    console.log('read(%s, %d, %d, %d)', path, fd, len, pos);
    const str = 'hello world\n'.slice(pos);
    if (!str) return process.nextTick(cb, 0);
    buf.write(str);
    return process.nextTick(cb, str.length);
  },
};

@injectable()
export class FuseMountStage implements Stage {
  label = 'Mount';

  constructor(@inject(ParamsContext) private context: ParamsContext) {}

  async run(): Promise<void> {
    const { mntPath } = this.context;

    const fuse = new Fuse(mntPath, ops, { debug: false, displayFolder: true });
    fuse.mount((err) => {
      if (err) throw err;
      console.log('fuseMount: mounted:', fuse.mnt);
    });

    process.once('SIGINT', function () {
      fuse.unmount((err) => {
        if (err) {
          throw err;
        }
        console.log('fuseMount: umounted', fuse.mnt);
      });
    });
  }
}
