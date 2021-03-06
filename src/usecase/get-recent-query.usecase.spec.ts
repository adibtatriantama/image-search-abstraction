import 'reflect-metadata';
import {MockProxy, mock} from 'jest-mock-extended';
import {QueryLogRepository} from '../repository/query-log-repository';
import {GetRecentQueryUseCase} from './get-recent-query.usecase';

let useCase: GetRecentQueryUseCase;
let repository: MockProxy<QueryLogRepository>;

beforeEach(() => {
  repository = mock<QueryLogRepository>();
  useCase = new GetRecentQueryUseCase(repository);
});

describe('GetRecentQueryUseCase', () => {
  it('should map entity to DTO', async () => {
    repository.getRecent.mockResolvedValue([
      {
        id: '1',
        searchQuery: 'cat',
        timeSearched: new Date(2022, 2, 10),
      },
    ]);
    const result1 = await useCase.execute();

    repository.getRecent.mockResolvedValue([
      {
        id: '2',
        searchQuery: 'cat',
        timeSearched: new Date(2022, 2, 1, 10),
      },
    ]);
    const result2 = await useCase.execute();

    repository.getRecent.mockResolvedValue([
      {
        id: '3',
        searchQuery: 'cat',
        timeSearched: new Date(2022, 2, 22, 10),
      },
    ]);
    const result3 = await useCase.execute();


    repository.getRecent.mockResolvedValue([
      {
        id: '4',
        searchQuery: 'cat',
        timeSearched: new Date(2022, 2, 11, 10),
      },
    ]);
    const result4 = await useCase.execute();

    repository.getRecent.mockResolvedValue([
      {
        id: '5',
        searchQuery: 'cat',
        timeSearched: new Date(2022, 2, 12, 10),
      },
    ]);
    const result5 = await useCase.execute();

    repository.getRecent.mockResolvedValue([
      {
        id: '6',
        searchQuery: 'cat',
        timeSearched: new Date(2022, 2, 13, 10),
      },
    ]);
    const result6 = await useCase.execute();

    expect(result1).toEqual([
      {
        _id: '1',
        searchQuery: 'cat',
        timeSearched: 'March 10th 2022, 12:00:00 am',
      },
    ]);

    expect(result2).toEqual([
      {
        _id: '2',
        searchQuery: 'cat',
        timeSearched: 'March 1st 2022, 10:00:00 am',
      },
    ]);

    expect(result3).toEqual([
      {
        _id: '3',
        searchQuery: 'cat',
        timeSearched: 'March 22nd 2022, 10:00:00 am',
      },
    ]);

    expect(result4).toEqual([
      {
        _id: '4',
        searchQuery: 'cat',
        timeSearched: 'March 11th 2022, 10:00:00 am',
      },
    ]);

    expect(result5).toEqual([
      {
        _id: '5',
        searchQuery: 'cat',
        timeSearched: 'March 12th 2022, 10:00:00 am',
      },
    ]);

    expect(result6).toEqual([
      {
        _id: '6',
        searchQuery: 'cat',
        timeSearched: 'March 13th 2022, 10:00:00 am',
      },
    ]);
  });
});
