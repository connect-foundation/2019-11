import { EntityRepository, EntityManager } from 'typeorm';
import { Rooms } from '../models/Rooms';

@EntityRepository()
export class RoomRepository {
  constructor(private readonly em: EntityManager) {}

  public find() {
    return this.em.find(Rooms);
  }

  public findOne(id: number) {
    return this.em.findOne(Rooms, id);
  }

  public save(room: Rooms) {
    return this.em.save(room);
  }
}
