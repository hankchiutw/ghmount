import { injectable, inject } from 'inversify';
import type { Stage } from './interfaces';
import { FetchFilesStage, FuseMountStage } from './stages';

@injectable()
export class StageRunner {
  beforeEach: (stage: Stage) => void = () => null;
  afterEach: (stage: Stage) => void = () => null;

  private stages: Stage[] = [this.fetchFilesStage, this.fuseMountStage];

  constructor(
    @inject(FetchFilesStage) private fetchFilesStage: FetchFilesStage,
    @inject(FuseMountStage) private fuseMountStage: FuseMountStage,
  ) {}

  async runAll(): Promise<void> {
    for (const stage of this.stages) {
      this.beforeEach(stage);
      await stage.run();
      this.afterEach(stage);
    }
  }
}
