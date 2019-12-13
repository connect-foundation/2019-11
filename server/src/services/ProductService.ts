import { Products } from "./../models/Products";
import { BidRepository } from "./../repositories/BidRepository";
import { BidResponseDTO } from "./../dto/BidResponseDTO";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { ProductRepository } from "../repositories/ProductRepository";
import { ImageRepository } from "../repositories/ImageRepository";
import { ProductResponseDTO } from "../dto/ProductResponseDTO";
import { UserResponseDTO } from "../dto/UserResponseDTO";
import { ImageResponseDTO } from "../dto/ImageResponseDTO";
import { UserRepository } from "../repositories/UserRepository";

@Service()
export class ProductsService {
  constructor(
    @InjectRepository() private readonly productRepository: ProductRepository,
    @InjectRepository() private readonly imageRepository: ImageRepository,
    @InjectRepository() private readonly bidRepository: BidRepository,
    @InjectRepository() private readonly userRepository: UserRepository
  ) {}

  /* Patch */
  public async update(productId: number, soldPrice: number, soldDate: string, buyerId: number) {
    const product = new Products();
    product.id = productId;
    product.soldPrice = soldPrice;
    product.soldDate = soldDate;
    product.buyerId = buyerId;
    const check = await this.productRepository.checkSold(productId);
    if (check && check.seller.id !== buyerId) {
      return await this.productRepository.update(product);
    } else {
      return false;
    }
  }

  public async rating(targetUserId: number, productId: number, point: number, isSeller: boolean) {
    let productInfo = await this.productRepository.findOne(productId);
    if (productInfo) {
      if (isSeller) {
        if (productInfo.sellerCheck === true) {
          return false;
        }
        productInfo.sellerCheck = true;
        await this.productRepository.update(productInfo);
      } else {
        if (productInfo.buyerCheck === true) {
          return false;
        }
        productInfo.buyerCheck = true;
        await this.productRepository.update(productInfo);
      }
    } else {
      return false;
    }

    //해당 유저의 매너 점수 조작
    let userInfo = await this.userRepository.findOnebyIdx(targetUserId);
    if (userInfo) {
      userInfo.mannerPoint = userInfo.mannerPoint + point;
      return await this.userRepository.save(userInfo);
    } else {
      return false;
    }
  }
}
