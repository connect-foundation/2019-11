import { Products } from "../models/Products";

export class ProductCardResponseDTO {
  constructor(product: Products, countBids: number, topBid: number) {
    this.id = product.id;
    this.title = product.title;
    this.contents = product.contents;
    this.immediatePrice = product.immediatePrice;
    this.hopePrice = product.hopePrice;
    this.startBidPrice = product.startBidPrice;
    this.registerDate = product.registerDate;
    this.auctionDeadline = product.auctionDeadline;
    this.extensionDate = product.extensionDate;
    this.soldPrice = product.soldPrice;
    this.soldDate = product.soldDate;
    this.thumbnailUrl = product.thumbnailUrl;
    this.categoryCode = product.categoryCode;
    this.isAuction = product.isAuction;
    this.buyerId = product.buyerId;
    this.countBids = countBids;
    this.topBid = topBid;
  }
  id: number;
  title: string;
  contents: string;
  immediatePrice: number;
  hopePrice: number;
  startBidPrice: number;
  registerDate: string;
  auctionDeadline: string;
  extensionDate: string;
  soldPrice: number;
  soldDate: string;
  thumbnailUrl: string;
  categoryCode: number;
  isAuction: boolean;
  buyerId: number;
  countBids: number;
  topBid: number;
}
