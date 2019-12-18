import { JsonController, Get, Param } from "routing-controllers";
import categoryJson from "../../constants/category.json";

@JsonController("/statics")
export class StaticController {
  @Get("/categories")
  public categories() {
    return categoryJson;
  }

  @Get("/categories/:code")
  public getCategoryName(@Param("code") code: number) {
    const mainIdx = Math.floor(code / 1000) - 1;
    const subIdx = (code % 1000) - 1;
    console.dir(mainIdx);
    console.dir(subIdx);
    console.dir(categoryJson[mainIdx]);
    return { title: categoryJson[mainIdx].sub[subIdx] };
  }
}
