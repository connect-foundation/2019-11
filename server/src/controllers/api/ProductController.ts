import {
  JsonController,
  Put,
  BodyParam,
  Post,
  Get,
  Param
} from "routing-controllers";
import { ProductsService } from "../../services/ProductService";

@JsonController("/products")
export class ProductController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  public async find() {
    return this.productService.find();
  }

  @Get("/:id")
  public async findOne(@Param("id") productId: string) {
    return this.productService.findOne(Number(productId));
  }

  @Put()
  public async create(
    @BodyParam("userId") userId: number,
    @BodyParam("title") title: string,
    @BodyParam("contents") contents: string,
    @BodyParam("thumbnail") thumbnail: string,
    @BodyParam("images") images: string[],
    @BodyParam("nowPrice") nowPrice: number,
    @BodyParam("hopePrice") hopePrice: number,
    @BodyParam("minPrice") minPrice: number,
    @BodyParam("timestamp") registerDate: Date,
    @BodyParam("endDate") endDate: Date,
    @BodyParam("categoryCode") categoryCode: number,
    @BodyParam("isAuction") isAuction: boolean
  ) {
    console.log("Control" + isAuction);
    const result = await this.productService.create(
      userId,
      title,
      contents,
      images,
      nowPrice,
      hopePrice,
      minPrice,
      registerDate,
      endDate,
      thumbnail,
      categoryCode,
      isAuction
    );
    return result;
  }

  @Post("/onlySale")
  public async sale(@BodyParam("id") userId: number) {
    return await this.productService.getOwnSale(userId);
  }
}
