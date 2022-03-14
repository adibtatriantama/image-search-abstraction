import * as express from 'express';
import {inject} from 'inversify';
import {controller, httpGet, response} from 'inversify-express-utils';
import {TYPES} from '../types';
import {GetRecentQueryUseCase} from '../usecase/get-recent-query.usecase';

@controller('/recent')
export class RecentController {
  constructor(
    @inject(TYPES.GetRecentQueryUseCase)
    private readonly recentQueryUseCase: GetRecentQueryUseCase,
  ) {}

  @httpGet('/')
  async list(@response() res: express.Response) {
    const dto = await this.recentQueryUseCase.execute();

    res.status(200).json(dto);
  }
}
