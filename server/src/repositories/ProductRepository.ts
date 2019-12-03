import { EntityRepository, EntityManager } from "typeorm";
import { ProductsDTO } from "../dto/ProductDTO";
import { Products } from "../models/Products";

@EntityRepository()
export class ProductRepository {
  constructor(private readonly em: EntityManager) {}

  public async find(start?: number, limit?: number) {
    return this.em
      .createQueryBuilder(Products, "products")
      .skip(start)
      .take(limit)
      .getMany();
  }

  public async findOne(productId: number) {
    return this.em
      .createQueryBuilder(Products, "products")
      .innerJoinAndSelect("products.seller", "user")
      .innerJoinAndSelect("products.images", "images")
      .where("products.id = :id", { id: productId })
      .getOne();
  }

  /*GET*/
  public async onlyOwnSale(userId: number) {
    return await this.em.findAndCount(Products, {
      relations: ["seller"],
      select: ["id", "title", "thumbnailUrl", "immediatePrice", "registerDate"],
      where: {
        seller: { id: userId },
        buyerId: null
      }
    });
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
    const dto = new ProductsDTO();

    console.log("Repo" + isAuction);

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
    );

    return await this.em.save(product);
  }
}
