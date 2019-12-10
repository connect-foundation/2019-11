import { EntityRepository, EntityManager, Equal, Not, IsNull, MoreThan } from "typeorm";
import { ProductsDTO } from "../dto/ProductDTO";
import { Products } from "../models/Products";
import { Today } from "../util/DateUtils";
@EntityRepository()
export class ProductRepository {
  constructor(private readonly em: EntityManager) {}

  public find(start?: number, limit?: number) {
    return this.em
      .createQueryBuilder(Products, "products")
      .skip(start)
      .take(limit)
      .getMany();
  }

  public findOne(productId: number) {
    return this.em
      .createQueryBuilder(Products, "products")
      .innerJoinAndSelect("products.seller", "user")
      .innerJoinAndSelect("products.images", "images")
      .where("products.id = :id", { id: productId })
      .getOne();
  }

  public update(product: Products) {
    return this.em.save(product);
  }

  public updateInfo(productId: number, title: string, contents: string) {
    const products = new Products();
    products.id = productId;
    products.title = title;
    products.contents = contents;

    return this.em.save(products);
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
    });
  }

  public findMyOne(productId: number) {
    return this.em.find(Products, {
      relations: ["images"],
      where: {
        id: productId,
        ["images.product.id"]: productId
      }
    });
  }

  /* DELETE */

  public async remove(pid: number) {
    return await this.em.delete(Products, { id: pid });
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

  public findAndOrder(take: number, orderOption: any) {
    return this.em.find(Products, {
      where: {
        soldPrice: IsNull(),
        isAuction: true,
        extensionDate: MoreThan(Today())
      },
      order: orderOption,
      skip: 0,
      take,
      cache: true
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
