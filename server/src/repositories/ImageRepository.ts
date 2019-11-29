import { EntityRepository, EntityManager } from "typeorm"
import { ImageDTO } from "../dto/ImageDTO"

@EntityRepository()
export class ImageRepository {
  constructor(private readonly em: EntityManager) {}

  /* PUT */
  public async create(productId: number, images: string[]) {
    const dto = new ImageDTO()

    const entities = images.map(value => dto.create(productId, value))

    return await this.em.save(entities)
  }
}
