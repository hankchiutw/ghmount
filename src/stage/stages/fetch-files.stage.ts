import { ParamsContext } from '@app/params';
import { injectable, inject } from 'inversify';
import { Stage } from '../interfaces';

@injectable()
export class FetchFilesStage implements Stage {
  label = 'Fetch file list';

  constructor(@inject(ParamsContext) private context: ParamsContext) {}

  async run(): Promise<void> {
    console.log('xxx: FetchFilesStage', this.context.repoPath);
  }
}
