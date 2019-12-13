import { JsonController, Get } from "routing-controllers";
import { ItemService } from "../../services/ItemService";

@JsonController("/items")
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get("/hot")
  public async findHot() {
    return await this.itemService.findHot();
  }

  @Get("/deadline")
  public async findDeadline() {
    return await this.itemService.findAndOrder(5, {
      extensionDate: "ASC"
    });
  }
}
