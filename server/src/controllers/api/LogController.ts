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
import { Products } from "../../models/Products"

/** TypeDi Constructor Injection 작동 방식
 * 1. TypeDi의 Container를 routing-controllers가 사용한다.(server.ts 소스 코드 참조)
 * 2. TypeDi가 Controller로 등록된 클래스들을 알고 있다.
 * 3. TypeDi는 @Inject를 통해서 dependency를 주입하는데, 생성자 주입(Constructor Injection)의 경우 @Inject를 생략해도 된다.
 */
@JsonController("/log")
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get()
  public find() {
    return this.logService.find()
  }

  @Get("/:id")
  public findOne(@Param("id") id: string) {
    return this.logService.findOne(parseInt(id))
  }

  @Post("/filter")
  public tradeList(
    @BodyParam("userid") userid: number,
    @BodyParam("dayago") dayago: number,
    @BodyParam("isSale") isSale: boolean,
    @BodyParam("isBuy") isBuy: boolean,
    @BodyParam("isAll") isAll: boolean,
    @BodyParam("page") page: number,
    @BodyParam("limit") limit: number
  ) {
    if (isBuy) {
      return this.logService.findBuyLog(userid, dayago, page, limit)
    }
    if (isSale) {
      return this.logService.findSellLog(userid, dayago, page, limit)
    }
  }

  @Put("/:id")
  @Patch("/:id")
  public update(@Param("id") id: string, @Body() product2: Products) {
    //TODO: user을 Users Model에 맞게 class-transformer를 사용해서 처리하자
    return this.logService.update(parseInt(id), product2)
  }

  @Delete("/:id")
  public delete(@Param("id") id: string) {
    return this.logService.delete(parseInt(id))
  }
}
