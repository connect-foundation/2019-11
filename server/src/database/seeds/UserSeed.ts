import { Images } from "./../../models/Images";
import { Products } from "./../../models/Products";
import { Factory, Seeder, times } from "typeorm-seeding";
import { Connection } from "typeorm";
import { Users } from "../../models/Users";

export class UserSeed implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    const em = connection.createEntityManager();

    let productId = 1;
    let imageId = 20 * 10 + 1; // userCount * productCount
    await times(20, async userCount => {
      const user = await factory(Users)({ index: userCount }).seed();

      const products = await times(10, async productCount => {
        const product = await factory(Products)({
          userCount: 20,
          index: productId++
        }).seed();

        const images = await times(5, async imageCount => {
          const image = factory(Images)({ index: imageId++ }).seed();
          return image;
        });

        product.images = images;
        return await em.save(product);
      });

      user.products = products;
      return await em.save(user);
    });
  }
}
