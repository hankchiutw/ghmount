import { injectable } from 'inversify';
import type { Params } from './interfaces';

@injectable()
export class ParamsContext implements Params {
  repoPath = '';
  mntPath = '';
}
