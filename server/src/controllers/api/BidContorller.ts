import { Request } from "express";
import { BidsService } from "../../services/BidService";
import {
  JsonController,
  Get,
  Param,
  Post,
  BodyParam,
  Req,
  Put,
  Body
} from "routing-controllers";

@JsonController("/bids")
export class BidController {
  constructor(private readonly bidService: BidsService) {}

  @Get()
  public find() {
    return this.bidService.find();
  }

  @Get("/:id")
  public findOne(@Param("id") bidId: string) {
    return this.bidService.findOne(parseInt(bidId));
  }

  @Post()
  public create(
    @Body() body: any,
    @BodyParam("bidDate") bidDate: string,
    @BodyParam("bidPrice") bidPrice: string,
    @BodyParam("productId") productId: string,
    @BodyParam("userId") userId: string,
    @BodyParam("test") test: string
  ) {
    console.log(`test::::::: ${test}`);
    console.dir(body);
    console.log("#######", bidDate, bidPrice, productId, userId);
    return this.bidService.create(
      bidDate,
      parseInt(bidPrice),
      parseInt(productId),
      parseInt(userId)
    );
  }
}
