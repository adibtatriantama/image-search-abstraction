import {ObjectId} from 'bson';
import {inject, injectable} from 'inversify';
import {ImageSearchResultDto} from '../model/image-search-result.dto';
import {QueryLogEntity} from '../model/query-log.entity';
import {QueryLogRepository} from '../repository/query-log-repository';
import {ImageSearchService} from '../service/image-search.service';
import {TYPES} from '../types';

export type ImageSearchUseCaseParams = {
  query: string;
  page: number;
};

@injectable()
export class ImageSearchUseCase {
  constructor(
    @inject(TYPES.ImageSearchService)
    private readonly imageSearchService: ImageSearchService,
    @inject(TYPES.QueryLogRepository)
    private readonly imageSearchRepository: QueryLogRepository,
  ) {}

  async execute(
      params: ImageSearchUseCaseParams,
  ): Promise<ImageSearchResultDto> {
    const items = await this.imageSearchService.imageSearch(
        params.query,
        params.page,
    );

    await this.imageSearchRepository.saveQuery(
        new QueryLogEntity(new ObjectId().toString(), params.query, new Date()),
    );

    return items;
  }
}
