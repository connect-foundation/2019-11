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

  public findOne(bidId: number) {
    return this.em.findOne(Bids, bidId);
  }

  public findByProductId(productId: number) {
    return this.em
      .createQueryBuilder(Bids, "bids")
      .innerJoinAndSelect("bids.product", "product", "product.id = :id", {
        id: productId
      })
      .getMany();
  }

  public create(bid: Bids) {
    return this.em.save(bid);
  }
}
