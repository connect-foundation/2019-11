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

  @Get()
  public async find(
    @QueryParam("start") start = startDefault,
    @QueryParam("limit") limit = limitDefault
  ) {
    return this.productService.find(Number(start), Number(limit));
  }

  @Get("/:id")
  public async findOne(@Param("id") productId: string) {
    return this.productService.findOne(Number(productId));
  }

  @Get("/withBids/:id")
  public async findOneWithBids(@Param("id") productId: string) {
    return this.productService.findOneWithBids(Number(productId));
  }

  @Authorized()
  @UseAfter(SystemLogger)
  @Get("/onlySale/:id/:start/:limits")
  public async sale(
    @Param("id") userId: number,
    @Param("start") start: number,
    @Param("limits") limits: number
  ) {
    const result = await this.productService.getOwnSale(userId, start, limits);
    return result;
  }

  @Patch("/:id")
  public async update(
    @Param("id") productId: string,
    @BodyParam("soldPrice") soldPrice: string,
    @BodyParam("soldDate") soldDate: string,
    @BodyParam("buyerId") buyerId: string
  ) {
    return await this.productService.update(
      parseInt(productId),
      parseInt(soldPrice),
      soldDate,
      parseInt(buyerId)
    );
  }

  @Put("/:id")
  public updateInfo(
    @Param("id") productId: number,
    @BodyParam("title") title: string,
    @BodyParam("contents") content: string
  ) {
    return this.productService.updateInfo(productId, title, content);
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
    );
    return result;
  }

  @Delete("/:id")
  public async remove(
    @HeaderParam("x-timestamp") timestamp: string,
    @HeaderParam("x-id") uid: number,
    @HeaderParam("x-uloginId") lid: string,
    @Param("id") pid: number
  ) {
    const result = await this.productService.remove(pid);

    return result;
  }

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
