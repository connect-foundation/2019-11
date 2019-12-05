import {
  JsonController,
  Put,
  BodyParam,
  Post,
  Get,
  Param,
  QueryParam,
  HeaderParam,
  Delete
} from "routing-controllers"
import { ProductsService } from "../../services/ProductService"

const startDefault = 0
const limitDefault = 50

@JsonController("/products")
export class ProductController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  public async find(
    @QueryParam("start") start = startDefault,
    @QueryParam("limit") limit = limitDefault
  ) {
    return this.productService.find(Number(start), Number(limit))
  }

  @Get("/:id")
  public async findOne(@Param("id") productId: string) {
    return this.productService.findOne(Number(productId))
  }

  @Get()
  public async sale(
    @BodyParam("id") userId: number,
    @BodyParam("page") page: number,
    @BodyParam("limits") limits: number
  ) {
    return await this.productService.getOwnSale(userId, page, limits)
  }

  @Put("/:id")
  public update(
    @Param("id") productId: string,
    @BodyParam("soldPrice") soldPrice: string,
    @BodyParam("soldDate") soldDate: string,
    @BodyParam("buyerId") buyerId: string
  ) {
    return this.productService.update(
      parseInt(productId),
      parseInt(soldPrice),
      soldDate,
      parseInt(buyerId)
    )
  }

  @Post()
  public async create(
    @HeaderParam("x-timestamp") registerDate: string,
    @BodyParam("userId") userId: number,
    @BodyParam("title") title: string,
    @BodyParam("contents") contents: string,
    @BodyParam("thumbnail") thumbnail: string,
    @BodyParam("images") images: string[],
    @BodyParam("nowPrice") nowPrice: number,
    @BodyParam("hopePrice") hopePrice: number,
    @BodyParam("minPrice") minPrice: number,
    @BodyParam("endDate") endDate: string,
    @BodyParam("categoryCode") categoryCode: number,
    @BodyParam("isAuction") isAuction: boolean
  ) {
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
    )
    return result
  }

  @Delete("/:id")
  public async remove(
    @HeaderParam("x-timestamp") timestamp: string,
    @HeaderParam("x-id") uid: number,
    @HeaderParam("x-uloginId") lid: string,
    @Param("id") pid: number
  ) {
    const result = await this.productService.remove(pid)

    return result
  }
}
