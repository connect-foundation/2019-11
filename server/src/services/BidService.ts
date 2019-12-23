import { Users } from "./../models/Users";
import { Products } from "./../models/Products";
import { Bids } from "./../models/Bids";
import { BidRepository } from "./../repositories/BidRepository";
import { ProductRepository } from "./../repositories/ProductRepository";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { NotAcceptableError } from "routing-controllers";

const MAX_BID_PRICE: number = 1000000000;
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

    let product = await this.productRepository.findOne(productId);
    const lastBids = await this.bidRepository.findLastBidBy(productId);
    const lastBid = lastBids[0];

    if (!userId) {
      throw new NotAcceptableError("로그인이 필요합니다.");
    }

    if (bidPrice > MAX_BID_PRICE) {
      throw new NotAcceptableError("10억 이하로만 입찰이 가능합니다.");
    }

    if (product === undefined) {
      throw new NotAcceptableError("해당하는 상품이 존재하지 않습니다.");
    }

    if (product.soldPrice !== null) {
      throw new NotAcceptableError("이미 구매 완료된 상품입니다.");
    }

    if (bidPrice < product.startBidPrice) {
      throw new NotAcceptableError(
        `${product.startBidPrice}원 보다 높아야 합니다.`
      );
    }

    if (product.seller.id === userId) {
      throw new NotAcceptableError(`자신의 상품은 입찰/구매가 불가능합니다.`);
    }

    if (lastBid && lastBid.user_id === userId) {
      throw new NotAcceptableError(`연속 입찰은 불가능합니다.`);
    }

    if (lastBid && bidPrice < lastBid.bid_price) {
      throw new NotAcceptableError(
        `현재 최소 입찰가보다 높은 가격에 입찰해야 합니다.`
      );
    }

    const minBidPrice = Math.floor(bidPrice * 1.2);
    if (product.immediatePrice < minBidPrice) {
      product.immediatePrice = Math.floor(minBidPrice * 1.2);
      product = await this.productRepository.update(product);
    }

    if (!product) {
      throw new NotAcceptableError(`즉시 구매 가격 업데이트 실패`);
    }

    const user = new Users();
    user.id = userId;
    bid.product = product;
    bid.user = user;
    return this.bidRepository.create(bid);
  }
}
