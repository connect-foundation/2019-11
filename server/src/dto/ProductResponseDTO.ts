import { UserResponseDTO } from "./UserResponseDTO";
import { ImageResponseDTO } from "./ImageResponseDTO";
import { BidResponseDTO } from "./BidResponseDTO";

export class ProductResponseDTO {
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
  seller: UserResponseDTO;
  images: ImageResponseDTO[];
  bids: BidResponseDTO[];
}
