import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Reservations } from '../../models/Reservations';

define(Reservations, (faker: typeof Faker, settings: any): Reservations => {
  const reservation = new Reservations();

  return reservation;
});
