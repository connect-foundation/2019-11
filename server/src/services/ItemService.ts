import { Users } from "./../models/Users"
import { Products } from "./../models/Products"
import { BidRepository } from "./../repositories/BidRepository"
import { BidResponseDTO } from "./../dto/BidResponseDTO"
import { Service } from "typedi"
import { InjectRepository } from "typeorm-typedi-extensions"
import { ProductRepository } from "../repositories/ProductRepository"
import { ImageRepository } from "../repositories/ImageRepository"
import { ProductResponseDTO } from "../dto/ProductResponseDTO"
import { UserResponseDTO } from "../dto/UserResponseDTO"
import { ImageResponseDTO } from "../dto/ImageResponseDTO"

@Service()
export class ItemService {
  constructor(@InjectRepository() private readonly productRepository: ProductRepository) {}

  public async find(categoryCode: number) {
    console.log("2222------------------------------------------")
    console.log(categoryCode)
    return await this.productRepository.findCategory(categoryCode)
  }
}
