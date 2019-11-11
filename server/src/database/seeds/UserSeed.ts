import { Factory, Seeder, times } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Users } from '../../models/Users';

import { Rooms } from '../../models/Rooms';
import { Files } from '../../models/Files';

export class UserSeed implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    const em = connection.createEntityManager();
    let fileId = 0;
    await times(20, async userCount => {
      const user = await factory(Users)().seed();

      const rooms = await times(8, async roomCount => {
        const room = await factory(Rooms)().seed();
        const files = await times(4, async fileCount => {
          return await factory(Files)({ id: fileId++ }).seed();
        });

        room.files = files;
        return await em.save(room);
      });

      user.rooms = rooms;
      return await em.save(user);
    });
  }
}
