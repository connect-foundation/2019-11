import { UserResponseDTO } from "./UserResponseDTO";
export class BidResponseDTO {
  id: number;
  bidPrice: number;
  bidDate: string;
  user: UserResponseDTO;
}
