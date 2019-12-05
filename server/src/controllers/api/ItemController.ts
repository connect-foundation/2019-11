import {
  JsonController,
  Put,
  BodyParam,
  Post,
  Get,
  Param,
  QueryParam,
  HeaderParam
} from "routing-controllers"
import { ItemService } from "../../services/ItemService"

@JsonController("/items")
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get("/:code")
  public async find(@Param("code") categoryCode: number) {
    console.log("------------------------------------------")
    console.log(categoryCode)
    return await this.itemService.find(Number(categoryCode))
  }
}
