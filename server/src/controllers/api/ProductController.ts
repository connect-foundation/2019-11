import { JsonController, Put, BodyParam } from "routing-controllers"
import { ProductsService } from "../../services/ProductService"

@JsonController("/products")
export class ProductController {
  constructor(private readonly service: ProductsService) {}

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
    console.log("Control" + isAuction)
    const result = await this.service.create(
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
    )
    return result
  }
}
