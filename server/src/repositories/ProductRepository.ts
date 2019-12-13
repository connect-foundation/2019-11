import { EntityRepository, EntityManager, Equal, Not, IsNull, MoreThan } from "typeorm";
import { ProductsDTO } from "../dto/ProductDTO";
import { Products } from "../models/Products";
import { Today } from "../util/DateUtils";
@EntityRepository()
export class ProductRepository {
  constructor(private readonly em: EntityManager) {}

  public checkSold(productId: number) {
    return this.em.findOne(Products, {
      relations: ["seller"],
      where: {
        id: productId,
        soldPrice: IsNull()
      }
    });
  }

  public findCategory(categoryCode: number) {
    return this.em.findAndCount(Products, {
      where: {
        categoryCode: categoryCode,
        soldPrice: IsNull(),
        extensionDate: MoreThan(Today())
      },
      order: { registerDate: "DESC" },
      cache: true
    });
  }

  public findOneAuction(productId: number) {
    return this.em.findOne(Products, {
      where: {
        id: productId,
        isAuction: true,
        soldDate: IsNull(),
        extensionDate: MoreThan(Today())
      },
      cache: true
    });
  }
}
