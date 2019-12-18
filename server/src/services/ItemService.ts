import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { ProductRepository } from "../repositories/ProductRepository";
import { BidRepository } from "../repositories/BidRepository";
import { ProductCardResponseDTO } from "../dto/ProductCardResponseDTO";
import { Products } from "../models/Products";

@Service()
export class ItemService {
  constructor(
    @InjectRepository() private readonly productRepository: ProductRepository,
    @InjectRepository() private readonly bidRepository: BidRepository
  ) {}

  public async find(categoryCode: number) {
    let [products, productCount] = await this.productRepository.findCategory(categoryCode);
    const bids = await Promise.all(products.map(p => this.bidRepository.findProductBidInfo(p.id)));
    return [
      products
        .map((p, i) => {
          const countBids = bids[i] === undefined ? 0 : bids[i].count;
          const topBid = bids[i] === undefined ? p.startBidPrice : bids[i].top_bid;
          return new ProductCardResponseDTO(p, countBids, topBid);
        })
        .filter(data => data),
      productCount
    ];
  }

  public async findRelated(id: number, categoryCode: number) {
    let [products, productCount] = await this.productRepository.findCategory(categoryCode);
    const bids = await Promise.all(products.map(p => this.bidRepository.findProductBidInfo(p.id)));
    return [
      products
        .map((p, i) => {
          if (p.id !== id) {
            const countBids = bids[i] === undefined ? 0 : bids[i].count;
            const topBid = bids[i] === undefined ? p.startBidPrice : bids[i].top_bid;
            return new ProductCardResponseDTO(p, countBids, topBid);
          }
        })
        .filter(data => data)
        .slice(0, 5),
      productCount
    ];
  }

  public async findHot() {
    const bids = await this.bidRepository.findHotItems();
    let hotProducts = await Promise.all(
      bids.map(b => {
        return this.productRepository.findOneAuction(b.product_id);
      })
    );
    hotProducts = hotProducts.filter(ele => ele !== undefined);
    let result = hotProducts
      .map((p, i) => new ProductCardResponseDTO(<Products>p, bids[i].count, bids[i].top_bid))
      .filter(data => data);
    if (result.length < 5) {
      const recentProducts = await this.findAndOrder(5, {
        registerDate: "ASC"
      });
      result.push(...recentProducts);
      // 중복 제거
      result = result.reduce((acc: any, item: any) => {
        if (acc.length < 5) {
          const index = acc.map((product: any) => product["id"]).indexOf(item.id);
          if (index < 0) acc.push(item);
        }
        return acc;
      }, []);
    }

    return result;
  }

  public async findAndOrder(take: number, orderOption: any) {
    const products = await this.productRepository.findAndOrder(take, orderOption);
    const bids = await Promise.all(products.map(p => this.bidRepository.findProductBidInfo(p.id)));
    return products
      .map((p, i) => {
        const countBids = bids[i] === undefined ? 0 : bids[i].count;
        const topBid = bids[i] === undefined ? p.startBidPrice : bids[i].top_bid;
        return new ProductCardResponseDTO(p, countBids, topBid);
      })
      .filter(data => data);
  }
}
