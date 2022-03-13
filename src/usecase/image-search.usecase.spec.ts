import 'reflect-metadata';
import {MockProxy, mock} from 'jest-mock-extended';
import {QueryLogRepository} from '../repository/query-log-repository';
import {ImageSearchService} from '../service/image-search.service';
import {ImageSearchUseCase} from './image-search.usecase';
import {ImageSearchResultDto} from '../model/image-search-result.dto';

const dummyResult: ImageSearchResultDto = {
  images: [
    {
      type: 'image',
      width: 100,
      height: 100,
      size: 100,
      url: 'https://example.com/cat.jpg',
      thumbnail: {
        url: 'https://example.com/cat_thumbnail.jpg',
        width: 100,
        height: 100,
      },
      description: 'cat',
      parentPage: 'https://example.com/cat.html',
    },
  ],
};

let useCase: ImageSearchUseCase;
let repository: MockProxy<QueryLogRepository>;
let service: MockProxy<ImageSearchService>;

beforeEach(() => {
  repository = mock<QueryLogRepository>();
  service = mock<ImageSearchService>();
  useCase = new ImageSearchUseCase(service, repository);

  service.imageSearch.mockResolvedValue(dummyResult);
});

describe('QueryImageUseCase', () => {
  it('should return query items', () => {
    const params = {
      query: 'cat',
      page: 0,
    };

    useCase.execute(params).then((res) => {
      expect(res).toEqual(dummyResult);
    });
  });

  it('should save query log', () => {
    const spy = jest.spyOn(repository, 'saveQuery');
    const params = {
      query: 'cat',
      page: 0,
    };

    useCase.execute(params).then((res) => {
      expect(spy).toHaveBeenCalled();
    });
  });
});
