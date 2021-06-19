import 'reflect-metadata';
import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';
import { API_URL, DEFAULT_API_URL } from './entities';
import { ParamsContext } from './params';
import { Api } from './shared/api';
import { StageModule } from './stage';

const diContainer = new Container({ defaultScope: 'Singleton' });
diContainer.bind<ParamsContext>(ParamsContext).toSelf();
diContainer.bind<string>(API_URL).toConstantValue(DEFAULT_API_URL);
diContainer.bind<Api>(Api).toSelf();

diContainer.load(StageModule);

const { lazyInject: injectProp } = getDecorators(diContainer);

export { diContainer, injectProp };
