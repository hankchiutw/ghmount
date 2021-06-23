import { fileNodeMap } from '@app/store';
import { injectable, inject } from 'inversify';
import { Stage } from '../../interfaces';
import { FetchFilesUsecase } from './fetch-files.usecse';

@injectable()
export class FetchFilesStage implements Stage {
  label = 'Fetch file list';

  constructor(@inject(FetchFilesUsecase) private usecase: FetchFilesUsecase) {}

  async run(): Promise<void> {
    const fileNodes = await this.usecase.fetchRepo();

    fileNodes.forEach((node) => {
      fileNodeMap[node.path] = node;
    });

    // set directory children
    fileNodes.forEach((node) => {
      const slashIndex = node.path.lastIndexOf('/');
      const parentPath = node.path.substring(0, slashIndex) || '/';
      const filename = node.path.substring(slashIndex + 1);
      fileNodeMap[parentPath].children.push(filename);
    });
  }
}
