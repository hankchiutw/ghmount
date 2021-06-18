import Fuse from 'fuse-native';
import type { FuseOperations } from 'fuse-native';
import type { ParamsContext } from '../../params';

const MODE_FILE = 33188;
const MODE_DIR = 16877;

const ops: FuseOperations = {
  readdir: function (path, cb) {
    console.log('readdir(%s)', path);
    if (path === '/') return process.nextTick(cb, 0, ['test', 'a']);
    if (path === '/a') return process.nextTick(cb, 0, ['a.txt']);
    return process.nextTick(cb, 0);
  },
  /*
  access: function (path, cb) {
    return process.nextTick(cb, 0)
  },
   */
  getattr: function (path, cb) {
    // console.log('getattr(%s)', path);
    if (path === '/') {
      return process.nextTick(cb, 0, {
        size: 100,
        mode: MODE_DIR,
      });
    }

    if (path === '/test') {
      return process.nextTick(cb, 0, {
        size: 12,
        mode: MODE_DIR,
      });
    }

    if (path === '/a') {
      return process.nextTick(cb, 0, {
        size: 12,
        mode: MODE_DIR,
      });
    }

    if (path === '/a/a.txt') {
      return process.nextTick(cb, 0, {
        size: 12,
        mode: MODE_FILE,
      });
    }

    return process.nextTick(cb, Fuse.ENOENT);
  },
  // open: function (path, flags, cb) {
  //   console.log('open(%s, %d)', path, flags);
  //   return process.nextTick(cb, 0, 42); // 42 is an fd
  // },
  read: function (path, fd, buf, len, pos, cb) {
    console.log('read(%s, %d, %d, %d)', path, fd, len, pos);
    const str = 'hello world\n'.slice(pos);
    if (!str) return process.nextTick(cb, 0);
    buf.write(str);
    return process.nextTick(cb, str.length);
  },
};

export async function fuseMount(context: ParamsContext): Promise<void> {
  const { mntPath } = context;

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
