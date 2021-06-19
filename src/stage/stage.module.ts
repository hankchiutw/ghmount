import { ContainerModule, interfaces } from 'inversify';
import { StageRunner } from './stage-runner';

export const StageModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<StageRunner>(StageRunner).toSelf();
});
