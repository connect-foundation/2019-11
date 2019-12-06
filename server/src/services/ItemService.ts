import { Service } from "typedi"
import { InjectRepository } from "typeorm-typedi-extensions"
import { ProductRepository } from "../repositories/ProductRepository"

@Service()
export class ItemService {
  constructor(@InjectRepository() private readonly productRepository: ProductRepository) {}

  public async find(categoryCode: number) {
    return await this.productRepository.findCategory(categoryCode)
  }
}
