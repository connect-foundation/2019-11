import { Service } from "typedi"
import { InjectRepository } from "typeorm-typedi-extensions"
import { ProductRepository } from "../repositories/ProductRepository"
import { ImageRepository } from "../repositories/ImageRepository"

@Service()
export class ProductsService {
  constructor(
    @InjectRepository() private readonly productRepo: ProductRepository,
    @InjectRepository() private readonly imageRepo: ImageRepository
  ) {}

  /** Post */
  public async getOwnSale(userId: number) {
    return await this.productRepo.onlyOwnSale(userId)
  }

  /** PUT */
  public async create(
    userId: number,
    title: string,
    contents: string,
    images: string[],
    nowPrice: number,
    hopePrice: number,
    minPrice: number,
    registerDate: Date,
    deadline: Date,
    thumbnail: string,
    category: number,
    isAuction: boolean
  ) {
    const product = await this.productRepo.create(
      userId,
      title,
      contents,
      nowPrice,
      hopePrice,
      minPrice,
      registerDate,
      deadline,
      thumbnail,
      category,
      isAuction
    )

    const image = await this.imageRepo.create(product.id, images)

    return product.id
  }
}
