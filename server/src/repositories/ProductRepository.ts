import { EntityRepository, EntityManager } from "typeorm"
import { ProductsDTO } from "../dto/ProductDTO"
import { Products } from "../models/Products"

@EntityRepository()
export class ProductRepository {
  constructor(private readonly em: EntityManager) {}

  public find(start?: number, limit?: number) {
    return this.em
      .createQueryBuilder(Products, "products")
      .skip(start)
      .take(limit)
      .getMany()
  }

  public findOne(productId: number) {
    return this.em
      .createQueryBuilder(Products, "products")
      .innerJoinAndSelect("products.seller", "user")
      .innerJoinAndSelect("products.images", "images")
      .where("products.id = :id", { id: productId })
      .getOne()
  }

  public update(product: Products) {
    return this.em.save(product)
  }

  /*GET*/
  public async onlyOwnSale(userId: number, start: number, limits: number) {
    return await this.em
      .createQueryBuilder(Products, "products")
      .select([
        "products.id",
        "products.title",
        "products.thumbnail_url",
        "products.immediate_price",
        "products.register_date"
      ])
      .where("products.seller_id = :id", { id: userId })
      .orderBy("id", "ASC")
      .skip(start)
      .take(limits)
      .getMany()
  }

  /* DELETE */

  public async remove(pid: number) {
    return await this.em.delete(Products, { id: pid })
  }

  /* PUT */
  public async create(
    userId: number,
    title: string,
    contents: string,
    nowPrice: number,
    hopePrice: number,
    minPrice: number,
    registerDate: string,
    endDate: string,
    thumbnail: string,
    categoryCode: number,
    isAuction: boolean
  ) {
    const dto = new ProductsDTO()
    const product = dto.create(
      userId,
      title,
      contents,
      nowPrice,
      hopePrice,
      minPrice,
      registerDate,
      endDate,
      thumbnail,
      categoryCode,
      isAuction
    )

    return await this.em.save(product)
  }
}
