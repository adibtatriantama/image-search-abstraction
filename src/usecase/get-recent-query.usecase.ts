import {inject, injectable} from 'inversify';
import {QueryLogDto} from '../model/query-log.dto';
import {QueryLogEntity} from '../model/query-log.entity';
import {QueryLogRepository} from '../repository/query-log-repository';
import {TYPES} from '../types';

@injectable()
export class GetRecentQueryUseCase {
  constructor(
    @inject(TYPES.QueryLogRepository)
    private readonly imageSearchRepository: QueryLogRepository,
  ) {}

  async execute(): Promise<QueryLogDto[]> {
    const entities = await this.imageSearchRepository.getRecent();

    return entities.map(this.mapEntityToDto);
  }

  mapEntityToDto(entity: QueryLogEntity): QueryLogDto {
    return {
      _id: entity.id,
      searchQuery: entity.searchQuery,
      timeSearched: formatDate(entity.timeSearched),
    };
  }
}

function formatDate(date: Date): string {
  // format date to string like this March 10th 2022, 12:00:00 am
  return `${getMonth(date.getMonth())} ${date.getDate()}${getOrdinalIndicator(
      date.getDate(),
  )} ${date.getFullYear()}, ${formatTime(date)}`;
}

function getMonth(n: number): string {
  switch (n) {
    case 0:
      return 'January';
    case 1:
      return 'February';
    case 2:
      return 'March';
    case 3:
      return 'April';
    case 4:
      return 'May';
    case 5:
      return 'June';
    case 6:
      return 'July';
    case 7:
      return 'August';
    case 8:
      return 'September';
    case 9:
      return 'October';
    case 10:
      return 'November';
    case 11:
      return 'December';
    default:
      return '';
  }
}

function getOrdinalIndicator(n: number): string {
  if (n === 11 || n === 12 || n === 13) {
    return 'th';
  } else {
    switch (n % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }
}

function formatTime(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hours >= 12 ? 'pm' : 'am';

  const hoursString = hours % 12 === 0 ? '12' : hours % 12;
  const minutesString = minutes < 10 ? `0${minutes}` : minutes;
  const secondsString = seconds < 10 ? `0${seconds}` : seconds;

  return `${hoursString}:${minutesString}:${secondsString} ${ampm}`;
}
