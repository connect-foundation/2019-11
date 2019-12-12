import { Users } from "./../models/Users";
import { Products } from "./../models/Products";
import { Bids } from "./../models/Bids";
import { BidRepository } from "./../repositories/BidRepository";
import { ProductRepository } from "./../repositories/ProductRepository";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";

@Service()
export class BidsService {
  constructor(
    @InjectRepository() private readonly bidRepository: BidRepository,
    @InjectRepository() private readonly productRepository: ProductRepository
  ) {}
  public async find(start?: number, limit?: number) {
    return this.bidRepository.find(start, limit);
  }

  public async findOne(bidId: number) {
    return this.bidRepository.findOne(bidId);
  }

  public async findByProductId(productId: number) {
    return this.bidRepository.findByProductId(productId);
  }

  public async create(bidDate: string, bidPrice: number, productId: number, userId: number) {
    const bid = new Bids();
    bid.bidDate = bidDate;
    bid.bidPrice = bidPrice;

    const product = new Products();
    product.id = productId;
    bid.product = product;

    const user = new Users();
    user.id = userId;
    bid.user = user;

    const productcheck = await this.productRepository.findOne(productId);
    const bidcheck = await this.bidRepository.findProductBidInfo(productId);
    if (
      productcheck !== undefined &&
      productcheck.soldPrice === null &&
      productcheck.startBidPrice < bidPrice &&
      productcheck.seller.id !== userId &&
      (bidcheck === undefined || bidcheck.top_bid < bidPrice)
    ) {
      return await this.bidRepository.create(bid);
    } else {
      return false;
    }
  }
}
