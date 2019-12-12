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

@Service()
export class ProductsService {
  constructor(
    @InjectRepository() private readonly productRepository: ProductRepository,
    @InjectRepository() private readonly imageRepository: ImageRepository,
    @InjectRepository() private readonly bidRepository: BidRepository
  ) {}

  public async find(start?: number, limit?: number) {
    return this.productRepository.find(start, limit);
  }

  public async findOne(productId: number) {
    return await this.productRepository.findMyOne(productId);
  }

  public async findOneWithBids(productId: number) {
    const product = await this.productRepository.findOne(productId);
    if (product) {
      const userResponse = new UserResponseDTO();
      userResponse.loginId = product.seller.loginId;
      userResponse.email = product.seller.email;
      userResponse.mannerPoint = product.seller.mannerPoint;
      userResponse.name = product.seller.name;
      userResponse.profileUrl = product.seller.profileUrl;

      const imageListResponse = product.images.map(image => {
        const imageRespone = new ImageResponseDTO();
        imageRespone.id = image.id;
        imageRespone.imageUrl = image.imageUrl;
        return imageRespone;
      });

      const bids = await this.bidRepository.findByProductId(product.id);

      const bidListResponse =
        bids &&
        bids.map(bid => {
          const bidResponseDTO = new BidResponseDTO();
          bidResponseDTO.bidDate = bid.bidDate;
          bidResponseDTO.bidPrice = bid.bidPrice;
          bidResponseDTO.id = bid.id;
          bidResponseDTO.user = bid.user;
          return bidResponseDTO;
        });

      const productResponse = new ProductResponseDTO();
      productResponse.auctionDeadline = product.auctionDeadline;
      productResponse.bids = product.bids;
      productResponse.buyerId = product.buyerId;
      productResponse.categoryCode = product.categoryCode;
      productResponse.contents = product.contents;
      productResponse.extensionDate = product.extensionDate;
      productResponse.hopePrice = product.hopePrice;
      productResponse.id = product.id;
      productResponse.immediatePrice = product.immediatePrice;
      productResponse.isAuction = product.isAuction;
      productResponse.registerDate = product.registerDate;
      productResponse.soldDate = product.soldDate;
      productResponse.soldPrice = product.soldPrice;
      productResponse.startBidPrice = product.startBidPrice;
      productResponse.title = product.title;
      productResponse.thumbnailUrl = product.thumbnailUrl;

      productResponse.seller = userResponse;
      productResponse.images = imageListResponse;
      productResponse.bids = bidListResponse;

      return productResponse;
    }
  }

  public async getOwnSale(userId: number, start: number, limits: number) {
    return await this.productRepository.onlyOwnSale(userId, start, limits);
  }

  public async create(
    userId: number,
    title: string,
    contents: string,
    images: string[],
    nowPrice: number,
    hopePrice: number,
    minPrice: number,
    registerDate: string,
    deadline: string,
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

  /** Put */
  public async updateInfo(productId: number, title: string, contents: string) {
    return this.productRepository.updateInfo(productId, title, contents);
  }

  /* Patch */
  public async update(
    productId: number,
    soldPrice: number,
    soldDate: string,
    buyerId: number
  ) {
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

  /** Delete */
  public async remove(pid: number) {
    return this.productRepository.remove(pid);
  }
}
