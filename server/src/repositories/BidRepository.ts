import { Bids } from "./../models/Bids";
import { EntityRepository, EntityManager } from "typeorm";

@EntityRepository()
export class BidRepository {
  constructor(private readonly em: EntityManager) {}

  public async find(start?: number, limit?: number) {
    return this.em
      .createQueryBuilder(Bids, "bids")
      .skip(start)
      .take(limit)
      .getMany();
  }

  public async findOne(bidId: number) {
    return this.em.findOne(Bids, bidId);
  }

  public async findByProductId(productId: number) {
    return this.em
      .createQueryBuilder(Bids, "bids")
      .innerJoinAndSelect("bids.product", "product", "product.id = :id", {
        id: productId
      })
      .getMany();
  }
}
