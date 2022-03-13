import {QueryLogEntity} from '../model/query-log.entity';

export interface QueryLogRepository {
  saveQuery(entity: QueryLogEntity): Promise<void>;
}
