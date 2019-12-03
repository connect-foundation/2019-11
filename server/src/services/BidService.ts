import { BidRepository } from "./../repositories/BidRepository";
import { BidResponseDTO } from "./../dto/BidResponseDTO";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { ProductResponseDTO } from "../dto/ProductResponseDTO";
import { UserResponseDTO } from "../dto/UserResponseDTO";
import { ImageResponseDTO } from "../dto/ImageResponseDTO";

@Service()
export class BidsService {
  constructor(
    @InjectRepository() private readonly bidRepository: BidRepository
  ) {}

  public async find(start?: number, limit?: number) {
    return this.bidRepository.find(start, limit);
  }

  public async findOne(bidId: number) {
    return this.bidRepository.findOne(bidId);
  }

  public async findByProductId(productId: number) {
    return this.bidRepository.findByProductId(productId);
  }
}
