import { Products } from "../models/Products"
import { Users } from "../models/Users"

export class ProductsDTO {
  public create(
    userId: number,
    title: string,
    contents: string,
    immediatePrice: number,
    hopePrice: number,
    minAuctionPrice: number,
    registerDate: Date,
    productDeadline: Date,
    categoryCode: number,
    isAuction: boolean
  ) {
    const products = new Products()

    // User Id 설정
    const user = new Users()
    user.id = userId

    products.title = title
    products.contents = contents
    products.immediatePrice = immediatePrice
    products.hopePrice = hopePrice
    products.startBidPrice = minAuctionPrice
    products.registerDate = registerDate
    products.auctionDeadline = productDeadline
    products.categoryCode = categoryCode
    products.isAuction = isAuction
    products.seller = user

    return products
  }
}
