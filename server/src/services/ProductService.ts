import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { ProductRepository } from "../repositories/ProductRepository";
import { ImageRepository } from "../repositories/ImageRepository";

@Service()
export class ProductsService {
  constructor(
    @InjectRepository() private readonly productRepository: ProductRepository,
    @InjectRepository() private readonly imageRepository: ImageRepository
  ) {}

  public async find(start?: number, limit?: number) {
    return this.productRepository.find(start, limit);
  }

  public async findOne(productId: number) {
    return this.productRepository.findOne(productId);
  }

  /** Post */
  public async getOwnSale(userId: number) {
    return await this.productRepository.onlyOwnSale(userId);
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
    const product = await this.productRepository.create(
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
    );

    const image = await this.imageRepository.create(product.id, images);

    return product.id;
  }
}
