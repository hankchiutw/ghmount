import type { ParamsContext } from '../../params';

export async function fuseMount(context: ParamsContext): Promise<void> {
  const { mntPath } = context;

  console.log('xxx: fuseMount:', mntPath);
}
