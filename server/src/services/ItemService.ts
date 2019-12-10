import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { ProductRepository } from "../repositories/ProductRepository";
import { BidRepository } from "../repositories/BidRepository";
import { ProductCardResponseDTO } from "../dto/ProductCardResponseDTO";

@Service()
export class ItemService {
  constructor(
    @InjectRepository() private readonly productRepository: ProductRepository,
    @InjectRepository() private readonly bidRepository: BidRepository
  ) {}

  public async find(categoryCode: number) {
    let [products, productCount] = await this.productRepository.findCategory(
      categoryCode
    );
    return [
      await products.reduce(async (acc: any, product) => {
        const bid = await this.bidRepository.findProductBidInfo(product.id);
        const productResponse = new ProductCardResponseDTO();
        productResponse.auctionDeadline = product.auctionDeadline;
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
        productResponse.countBids = bid === undefined ? 0 : bid.count;
        productResponse.topBid =
          bid === undefined ? product.startBidPrice : bid.top_bid;
        const result = await acc.then();
        result.push(productResponse);
        return Promise.resolve(result);
      }, Promise.resolve([])),
      productCount
    ];
  }
  public async findHot() {
    // return await this.productRepository.findHotAuction()
    const bids = await this.bidRepository.findHotItems();
    let hotProducts = await bids.reduce(async (acc: any, bid) => {
      const result = await acc.then();
      if (result.length <= 5) {
        const product = await this.productRepository.findOneAuction(
          bid.product_id
        );
        if (product !== undefined) {
          const productResponse = new ProductCardResponseDTO();
          productResponse.auctionDeadline = product.auctionDeadline;
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
          productResponse.countBids = bid.count;
          productResponse.topBid = bid.top_bid;
          result.push(productResponse);
        }
      }
      return Promise.resolve(result);
    }, Promise.resolve([]));
    if (hotProducts.length < 5) {
      const recentProducts = await this.findAndOrder(5, {
        registerDate: "ASC"
      });
      hotProducts.push(...recentProducts);
      hotProducts = hotProducts.reduce((acc: any, item: any) => {
        if (acc.length < 5) {
          const index = acc
            .map((product: any) => product["id"])
            .indexOf(item.id);
          if (index < 0) acc.push(item);
        }
        return acc;
      }, []);
    }
    return hotProducts;
  }

  public async findAndOrder(take: number, orderOption: any) {
    const products = await this.productRepository.findAndOrder(
      take,
      orderOption
    );
    return products.reduce(async (acc: any, product) => {
      const bid = await this.bidRepository.findProductBidInfo(product.id);
      const productResponse = new ProductCardResponseDTO();
      productResponse.auctionDeadline = product.auctionDeadline;
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
      productResponse.countBids = bid === undefined ? 0 : bid.count;
      productResponse.topBid =
        bid === undefined ? product.startBidPrice : bid.top_bid;
      const result = await acc.then();
      result.push(productResponse);
      return Promise.resolve(result);
    }, Promise.resolve([]));
  }
}
