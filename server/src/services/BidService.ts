import { Users } from "./../models/Users";
import { Products } from "./../models/Products";
import { Bids } from "./../models/Bids";
import { BidRepository } from "./../repositories/BidRepository";
import { ProductRepository } from "./../repositories/ProductRepository";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { NotAcceptableError } from "routing-controllers";

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

  public async create(
    bidDate: string,
    bidPrice: number,
    productId: number,
    userId: number
  ) {
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

    if (productcheck === undefined) {
      throw new NotAcceptableError("해당하는 상품이 존재하지 않습니다.");
    }

    if (productcheck.soldPrice !== null) {
      throw new NotAcceptableError("이미 구매 완료된 상품입니다.");
    }

    if (bidPrice < productcheck.startBidPrice) {
      throw new NotAcceptableError(
        `입찰 금액이 입찰 시작 금액(${productcheck.startBidPrice})보다 높아야 합니다.`
      );
    }

    if (productcheck.seller.id === userId) {
      throw new NotAcceptableError(`자신의 상품은 입찰/구매가 불가능합니다.`);
    }

    if (bidcheck && bidPrice < bidcheck.top_bid) {
      throw new NotAcceptableError(
        `현재 최소 입찰가보다 높은 가격에 입찰해야 합니다.`
      );
    }

    return this.bidRepository.create(bid);
  }
}
