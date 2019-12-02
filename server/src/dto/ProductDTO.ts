import { Products } from "../models/Products";
import { Users } from "../models/Users";

export class ProductsDTO {
  public create(
    userId: number,
    title: string,
    contents: string,
    immediatePrice: number,
    hopePrice: number,
    startBidPrice: number,
    registerDate: string,
    endDate: string,
    thumbnail: string,
    categoryCode: number,
    isAution: boolean
  ) {
    const products = new Products();

    // NotNull Field
    products.title = title;
    products.contents = contents;
    products.immediatePrice = immediatePrice;
    products.registerDate = registerDate;
    products.auctionDeadline = endDate;
    products.thumbnailUrl = thumbnail;
    products.categoryCode = categoryCode;
    products.isAuction = isAution;

    // Nullable Field
    products.hopePrice = hopePrice;
    products.startBidPrice = startBidPrice;

    // 외래키
    // 물건을 등록하는 사람은 판매자가 된다.
    const user = new Users();
    user.id = userId;
    products.seller = user;

    return products;
  }
}
