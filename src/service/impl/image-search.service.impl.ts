import axios from 'axios';
import {injectable} from 'inversify';
import {ImageItemDto} from '../../model/image-item.dto';
import {ImageSearchResultDto} from '../../model/image-search-result.dto';
import {ImageSearchService} from '../image-search.service';

type Image = {
  contextLink: string;
  height: number;
  width: number;
  byteSize: number;
  thumbnailLink: string;
  thumbnailHeight: number;
  thumbnailWidth: number;
};

type Item = {
  kind: string;
  title: string;
  htmlTitle: string;
  link: string;
  displayLink: string;
  snippet: string;
  htmlSnippet: string;
  mime: string;
  fileFormat: string;
  image: Image;
};

type CustomSearchResultDto = {
  kind: string;
  url: any;
  queries: any;
  context: any;
  searchInformation: any;
  items: Item[];
};

@injectable()
export class ImageSearchServiceImpl implements ImageSearchService {
  async imageSearch(
      query: string,
      page: number = 0,
  ): Promise<ImageSearchResultDto> {
    const start = page ? page * 10 + 1 : 1;
    const response = await axios.get<CustomSearchResultDto>(
        'https://customsearch.googleapis.com/customsearch/v1',
        {
          params: {
            key: process.env.CUSTOM_SEARCH_API_KEY,
            cx: process.env.SEARCH_ENGINE_ID,
            q: query,
            searchType: 'image',
            start,
          },
        },
    );

    const data = response.data;

    return {images: data.items.map(this.mapItemToImageItemDto)};
  }

  mapItemToImageItemDto(item: Item): ImageItemDto {
    return {
      type: item.mime,
      width: item.image.width,
      height: item.image.height,
      size: item.image.byteSize,
      url: item.image.contextLink,
      thumbnail: {
        url: item.image.thumbnailLink,
        width: item.image.thumbnailWidth,
        height: item.image.thumbnailHeight,
      },
      description: item.snippet,
      parentPage: item.link,
    };
  }
}
