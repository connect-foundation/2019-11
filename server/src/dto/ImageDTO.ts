import { Images } from "../models/Images"
import { Products } from "../models/Products"

export class ImageDTO {
  public create(productId: number, uri: string) {
    const image = new Images()
    const product = new Products()
    product.id = productId

    image.imageUrl = uri

    return image
  }
}
