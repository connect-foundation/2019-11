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
  public async onlyOwnSale(userId: number, page: number, limits: number) {
    return await this.em.findAndCount(Products, {
      relations: ["seller"],
      select: ["id", "title", "thumbnailUrl", "immediatePrice", "registerDate"],
      where: {
        seller: { id: userId },
        buyerId: null
      },
      skip: page * limits,
      take: limits,
      cache: true
    })
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
