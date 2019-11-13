import { Factory, Seeder, times } from "typeorm-seeding";
import { Connection } from "typeorm";
import { Users } from "../../models/Users";

/** UserSeed Example */
export class UserSeed implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    const em = connection.createEntityManager();

    await times(20, async userCount => {
      const user = await factory(Users)().seed();
      // user.rooms = rooms;
      return await em.save(user);
    });
  }
}
