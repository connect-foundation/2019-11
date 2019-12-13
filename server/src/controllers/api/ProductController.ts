import {
  JsonController,
  Put,
  Patch,
  BodyParam,
  Post,
  Get,
  Param,
  QueryParam,
  HeaderParam,
  Delete,
  UseAfter,
  Authorized
} from "routing-controllers";
import { ProductsService } from "../../services/ProductService";
import { SystemLogger } from "../../middlewares/SystemLogger";
const startDefault = 0;
const limitDefault = 50;

@JsonController("/products")
export class ProductController {
  constructor(private readonly productService: ProductsService) {}

  @Post("/rating")
  public async rating(
    @BodyParam("targetUserId") targetUserId: number,
    @BodyParam("productId") productId: number,
    @BodyParam("point") point: number,
    @BodyParam("isSeller") isSeller: boolean
  ) {
    return await this.productService.rating(targetUserId, productId, point, isSeller);
  }
}
