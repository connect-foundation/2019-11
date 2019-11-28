import { EntityRepository, EntityManager } from "typeorm"
import { ProductsDTO } from "../dto/ProductDTO"

@EntityRepository()
export class ProductRepository {
  constructor(private readonly em: EntityManager) {}

  /* PUT */
  public async create(
    userId: number,
    title: string,
    contents: string,
    nowPrice: number,
    hopePrice: number,
    minPrice: number,
    registerDate: Date,
    endDate: Date,
    thumbnail: string,
    categoryCode: number,
    isAuction: boolean
  ) {
    const dto = new ProductsDTO()

    console.log("Repo" + isAuction)

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
