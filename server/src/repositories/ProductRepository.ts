import { EntityRepository, EntityManager, Equal, Not, IsNull } from "typeorm"
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
    return await this.em.findAndCount(Products, {
      select: ["id", "title", "thumbnailUrl", "immediatePrice", "registerDate"],
      where: {
        seller: userId
      },
      order: {
        id: "ASC"
      },
      skip: start,
      take: limits,
      cache: true
    })
  }

  /* DELETE */

  public async remove(pid: number) {
    return await this.em.delete(Products, { id: pid })
  }

  public findCategory(categoryCode: number) {
    return this.em.findAndCount(Products, {
      where: {
        categoryCode: categoryCode,
        soldPrice: Not(IsNull())
      },
      order: { registerDate: "DESC" },
      cache: true
    })
  }

  public findHotAuction() {
    return this.em
      .getRepository("Products")
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.bids", "bids")
      .select("product.id as id")
      .addSelect("product.title as title")
      .addSelect("product.contents as contents")
      .addSelect("product.immediate_price as immediatePrice")
      .addSelect("product.hope_price as hopePrice")
      .addSelect("product.start_bid_price as startBidPrice")
      .addSelect("product.register_date as registerDate")
      .addSelect("product.auction_deadline as auctionDeadline")
      .addSelect("product.extension_date as extensionDate")
      .addSelect("product.sold_price as soldPrice")
      .addSelect("product.sold_date as soldDate")
      .addSelect("product.thumbnail_url as thumbnailUrl")
      .addSelect("product.category_code as categoryCode")
      .addSelect("product.is_auction as isAuction")
      .addSelect("product.buyer_id as buyerId")
      .addSelect("product.seller_id as sellerId")
      .addSelect("COUNT(product.id) as countbid")
      .where("product.sold_date is not null")
      .groupBy("product.id")
      .orderBy("countbid", "DESC")
      .addOrderBy("registerDate", "DESC")
      .limit(5)
      .getRawMany()
  }

  public findDeadline() {
    return this.em.find(Products, {
      where: {
        soldPrice: Not(IsNull())
      },
      order: { extensionDate: "ASC" },
      skip: 0,
      take: 5,
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
