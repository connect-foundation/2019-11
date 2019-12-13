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
} from "routing-controllers"
import { LogService } from "../../services/LogService"

@JsonController("/log")
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Post("/filter")
  public tradeList(
    @BodyParam("userid") userid: number,
    @BodyParam("dayago") dayago: number,
    @BodyParam("isSale") isSale: boolean,
    @BodyParam("isBuy") isBuy: boolean,
    @BodyParam("page") page: number,
    @BodyParam("limit") limit: number
  ) {
    if (isBuy && isSale) {
      return this.logService.findAllLog(userid, dayago, page, limit)
    } else {
      if (isBuy) {
        return this.logService.findBuyLog(userid, dayago, page, limit)
      } else if (isSale) {
        return this.logService.findSellLog(userid, dayago, page, limit)
      } else {
        return [[], [0]]
      }
    }
  }
}
