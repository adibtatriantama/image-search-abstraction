import {PrismaClient} from '@prisma/client';
import {inject, injectable} from 'inversify';
import {QueryLogEntity} from '../../model/query-log.entity';
import {TYPES} from '../../types';
import {QueryLogRepository} from '../query-log-repository';

@injectable()
export class QueryLogRepositoryImpl implements QueryLogRepository {
  constructor(
    @inject(TYPES.PrismaClient) private readonly prismaClient: PrismaClient,
  ) {}

  async saveQuery(entity: QueryLogEntity): Promise<void> {
    await this.prismaClient.log.create({
      data: entity,
    });
  }

  async getRecent(): Promise<QueryLogEntity[]> {
    const data = await this.prismaClient.log.findMany();

    return data;
  }
}
