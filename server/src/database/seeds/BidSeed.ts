import { Products } from "./../../models/Products";
import { Bids } from "./../../models/Bids";
import { Factory, Seeder, times } from "typeorm-seeding";
import { Connection } from "typeorm";
import { Users } from "../../models/Users";
import moment from "moment";

const randomBetween = (min: number, max: number) => {
  return Math.round(Math.random() * (max - min) + min);
};

export class BidSeed implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    const em = connection.createEntityManager();

    let productId = 1;
    const users = await em.find(Users);

    //모든 유저가 5개 제품에 대해서 각각 1개씩 입찰한 임시 데이터 넣기
    users.forEach(async user => {
      console.log(1);
      const products = await connection
        .getRepository(Products)
        .createQueryBuilder("product")
        .getMany();

      productId = productId + 5;
      console.log(2);

      const bids = await times(5, async productCount => {
        const product = products[productCount];
        const date = moment(product.auctionDeadline)
          .subtract(randomBetween(1, 10), "d")
          .format("YYYY-MM-DD h:mm:ss");

        const bid = await factory(Bids)({ date }).seed();
        bid.user = user;
        bid.product = product;
        return await em.save(bid);
      });

      user.bids = bids;
      await em.save(user);
    });
  }
}
