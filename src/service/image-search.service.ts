import {ImageSearchResultDto} from '../model/image-search-result.dto';

export interface ImageSearchService {
  imageSearch(query: string, page: number): Promise<ImageSearchResultDto>;
}
