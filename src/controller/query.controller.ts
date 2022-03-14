import * as express from 'express';
import {inject} from 'inversify';
import {
  controller,
  httpGet,
  queryParam,
  requestParam,
  response,
} from 'inversify-express-utils';
import {TYPES} from '../types';
import {ImageSearchUseCase} from '../usecase/image-search.usecase';

@controller('/query')
export class QueryController {
  constructor(
    @inject(TYPES.ImageSearchUseCase)
    private readonly imageSearchUseCase: ImageSearchUseCase,
  ) {}

  @httpGet('/:query')
  imageSearch(
    @requestParam('query') query: string,
    @queryParam('page') pageString: string,
    @response() res: express.Response,
  ) {
    const page = pageString ? parseInt(pageString) : 1;

    if (Number.isNaN(page)) {
      res.status(400).json({error: 'page must be a number'});
    } else {
      try {
        return this.imageSearchUseCase.execute({
          query: query,
          page,
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({error: error});
      }
    }
  }
}
