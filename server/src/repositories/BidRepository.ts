import { Bids } from "./../models/Bids";
import { EntityRepository, EntityManager } from "typeorm";

@EntityRepository()
export class BidRepository {
  constructor(private readonly em: EntityManager) {}

  public find(start?: number, limit?: number) {
    return this.em
      .createQueryBuilder(Bids, "bids")
      .skip(start)
      .take(limit)
      .getMany();
  }

  public findHotItems() {
    return this.em
      .createQueryBuilder(Bids, "bids")
      .innerJoinAndSelect("bids.product", "products")
      .select("bids.product")
      .addSelect("MAX(bids.bid_price) as top_bid")
      .addSelect("COUNT(bids.product) as count")
      .groupBy("bids.product")
      .orderBy("count", "DESC")
      .getRawMany();
  }

  public findProductBidInfo(productId: number) {
    return this.em
      .createQueryBuilder(Bids, "bids")
      .innerJoinAndSelect("bids.product", "products")
      .where(`products.id= :id`, {
        id: productId
      })
      .select("bids.product")
      .addSelect("MAX(bids.bid_price) as top_bid")
      .addSelect("COUNT(bids.product) as count")
      .groupBy("bids.product")
      .getRawOne();
  }

  public findLastBidBy(productId: number) {
    return this.em.query(
      "SELECT * FROM bids WHERE product_id=? ORDER BY bid_date DESC LIMIT 1",
      [productId]
    );
  }

  public findOne(bidId: number) {
    return this.em.findOne(Bids, bidId);
  }

  public findByProductId(productId: number) {
    return this.em
      .createQueryBuilder(Bids, "bids")
      .innerJoinAndSelect("bids.product", "product")
      .where(`product.id= :id`, {
        id: productId
      })
      .getMany();
  }

  public create(bid: Bids) {
    return this.em.save(bid);
  }
}
