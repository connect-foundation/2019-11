import { Bids } from "./../../models/Bids";
import * as Faker from "faker";
import { define } from "typeorm-seeding";
import * as Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

const randomBetween = (min: number, max: number) => {
  return Math.round(Math.random() * (max - min) + min);
};

define(Bids, (faker: typeof Faker, settings: any): Bids => {
  const bid = new Bids();

  bid.bidPrice = faker.random.number();
  bid.bidDate = settings.date;

  // bid.product
  // bid.user

  return bid;
});
