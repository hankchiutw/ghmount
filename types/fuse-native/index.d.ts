declare module 'fuse-native' {
  type NextCallback = (code: number, ...args: any[]) => void;
  type OperationSimpleCallback = (path: string, cb: NextCallback) => void;
  type OperationOpenCallback = (
    path: string,
    flags: number,
    cb: NextCallback,
  ) => void;
  type OperationReadCallback = (
    path: string,
    fd: number,
    buf: Buffer,
    len: number,
    pos: number,
    cb: NextCallback,
  ) => void;

  type ErrorCallback = (e: Error) => void;

  export interface FuseOperations {
    readdir?: OperationSimpleCallback;
    getattr?: OperationSimpleCallback;
    open?: OperationOpenCallback;
    read?: OperationReadCallback;
  }

  interface FuseOptions {
    debug?: boolean;
    displayFolder?: boolean;
  }

  class Fuse {
    mnt: string;
    static ENOENT: number;

    constructor(mnt: string, ops: FuseOperations, options?: FuseOptions);
    mount(cb: ErrorCallback): void;
    unmount(cb: ErrorCallback): void;
  }

  export default Fuse;
}
