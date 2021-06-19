import 'reflect-metadata';
import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';
import { API_URL, DEFAULT_API_URL } from './entities';
import { ParamsContext } from './params';
import { Api } from './shared/api';
import { StageRunner } from './stage-runner';

const diContainer = new Container({ defaultScope: 'Singleton' });
diContainer.bind<ParamsContext>(ParamsContext).toSelf();
diContainer.bind<StageRunner>(StageRunner).toSelf();
diContainer.bind<string>(API_URL).toConstantValue(DEFAULT_API_URL);
diContainer.bind<Api>(Api).toSelf();

const { lazyInject: injectProp } = getDecorators(diContainer);

export { diContainer, injectProp };
