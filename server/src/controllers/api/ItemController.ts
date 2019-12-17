import {
  JsonController,
  Put,
  BodyParam,
  Post,
  Get,
  Param,
  QueryParam,
  HeaderParam
} from "routing-controllers";
import { ItemService } from "../../services/ItemService";

@JsonController("/items")
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get("/category/:code")
  public find(@Param("code") categoryCode: number) {
    return this.itemService.find(Number(categoryCode));
  }

  @Get("/hot")
  public findHot() {
    return this.itemService.findHot();
  }

  @Get("/deadline")
  public findDeadline() {
    return this.itemService.findAndOrder(5, {
      extensionDate: "ASC"
    });
  }

  @Get("/related/:code/:id")
  public findRelated(
    @Param("code") categoryCode: number,
    @Param("id") id: number
  ) {
    return this.itemService.findRelated(Number(id), Number(categoryCode));
  }
}
