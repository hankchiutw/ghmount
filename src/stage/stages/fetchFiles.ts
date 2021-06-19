import type { ParamsContext } from '../../params';

export async function fetchFiles(context: ParamsContext): Promise<void> {
  const { repoPath } = context;

  console.log('xxx: fetchFiles:', repoPath);
}
