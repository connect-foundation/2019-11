export class ProductCardResponseDTO {
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
