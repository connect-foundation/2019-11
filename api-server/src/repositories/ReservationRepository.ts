import { EntityRepository, EntityManager } from 'typeorm';
import { Reservations } from '../models/Reservations';

@EntityRepository()
export class ReservationReporsitory {
  constructor(private readonly em: EntityManager) {}

  public find() {
    return this.em.find(Reservations);
  }

  public findOne(id: number) {
    return this.em.findOne(Reservations, id);
  }

  public save(reservation: Reservations) {
    return this.em.save(reservation);
  }
}
