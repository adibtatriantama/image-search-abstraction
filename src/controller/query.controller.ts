import * as express from 'express';
import {inject} from 'inversify';
import {
  controller,
  httpGet,
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
    @requestParam('page') page: string,
    @response() res: express.Response,
  ) {
    try {
      return this.imageSearchUseCase.execute({
        query: query,
        page: parseInt(page),
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({error: error});
    }
  }
}
