import { JsonController, Get } from "routing-controllers";
import categoryJson from "../../constants/category.json";

@JsonController("/statics")
export class StaticController {
  @Get("/categories")
  public categories() {
    return categoryJson;
  }
}
