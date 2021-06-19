import { ContainerModule, interfaces } from 'inversify';
import { StageRunner } from './stage-runner';
import { FetchFilesStage, FuseMountStage } from './stages';

export const StageModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<StageRunner>(StageRunner).toSelf();
  bind<FetchFilesStage>(FetchFilesStage).toSelf();
  bind<FuseMountStage>(FuseMountStage).toSelf();
});
