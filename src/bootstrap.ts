import 'reflect-metadata';
import {PrismaClient} from '@prisma/client';
import bodyParser from 'body-parser';
import {Application} from 'express';
import {Container} from 'inversify';
import {InversifyExpressServer} from 'inversify-express-utils';
import './controller/query.controller';
import {QueryLogRepositoryImpl}
  from './repository/impl/query-log.repository.impl';
import {QueryLogRepository} from './repository/query-log-repository';
import {ImageSearchService} from './service/image-search.service';
import {ImageSearchServiceImpl} from './service/impl/image-search.service.impl';
import {TYPES} from './types';
import {ImageSearchUseCase} from './usecase/image-search.usecase';

const PORT = 3000;

export type BootstrapReturnType = {
  server: Application;
  container: Container;
};

export const bootstrap = async (): Promise<BootstrapReturnType> => {
  const container = new Container();
  container
      .bind<PrismaClient>(TYPES.PrismaClient)
      .toDynamicValue(() => new PrismaClient())
      .inSingletonScope();
  container
      .bind<ImageSearchService>(TYPES.ImageSearchService)
      .to(ImageSearchServiceImpl);
  container
      .bind<QueryLogRepository>(TYPES.QueryLogRepository)
      .to(QueryLogRepositoryImpl);
  container
      .bind<ImageSearchUseCase>(TYPES.ImageSearchUseCase)
      .to(ImageSearchUseCase);

  const prisma = container.get<PrismaClient>(TYPES.PrismaClient);
  await prisma.$connect();

  const server = new InversifyExpressServer(container);

  server.setConfig((app) => {
    app.use(
        bodyParser.urlencoded({
          extended: true,
        }),
    );
    app.use(bodyParser.json());
  });

  const serverInstance = server.build();

  serverInstance.listen(PORT);
  console.log('Server started on port 3000 :)');

  return {
    server: serverInstance,
    container,
  };
};

if (process.env.NODE_ENV !== 'test') {
  bootstrap();
}
