import {
  JsonController,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Put,
  Delete,
  BodyParam,
  OnUndefined
} from 'routing-controllers';
import { LogService } from '../../services/LogService';
import { Auction_logs } from '../../models/Auction_logs';

@JsonController('/log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get()
  public find() {
    return this.logService.find();
  }

  @Get('/:id')
  public findOne(@Param('id') id: string) {
    return this.logService.findOne(parseInt(id));
  }

//https://stackoverflow.com/questions/27835962/sails-js-mysql-unknown-column-nan-in-where-clause
  @Post()
  public create(@Body() auction_logs: Auction_logs) {
    //TODO: user을 Users Model에 맞게 class-transformer를 사용해서 처리하자
    return this.logService.create(auction_logs);
  }

  @Post('/filter')
  public filter(
    @BodyParam('userid') userid: number,
    @BodyParam('productid') productid: number,
    @BodyParam('dayago') dayago: number,
    @BodyParam('isSale') isSale: boolean,
    @BodyParam('isBuy') isBuy: boolean,

    @BodyParam('page') page: number,
    @BodyParam('limit') limit: number){
    
    //판매만

    //구매만
    if(isBuy){
      return this.logService.findBuyLogs(userid,dayago,page,limit);
    }
    //판매,구매

    //날짜

    //페이지
    //전체갯수
  }

  @Put('/:id')
  @Patch('/:id')
  public update(@Param('id') id: string, @Body() auction_logs: Auction_logs) {
    //TODO: user을 Users Model에 맞게 class-transformer를 사용해서 처리하자
    return this.logService.update(parseInt(id), auction_logs);
  }

  @Delete('/:id')
  public delete(@Param('id') id: string) {
    return this.logService.delete(parseInt(id));
  }
}
