import { Users } from "../../models/Users";
import * as Faker from "faker";
import { define } from "typeorm-seeding";

define(Users, (faker: typeof Faker, settings: any): Users => {
  faker.locale = "en";

  const user = new Users();
  user.loginId = faker.lorem.word();
  user.password = faker.random.number().toString();
  user.salt = faker.lorem.word();
  faker.locale = "ko";
  user.name = `${faker.name.lastName()}${faker.name.firstName()}`;
  faker.locale = "en";
  user.profileUrl = `https://i.pravatar.cc/150?img=${settings.index}`;
  user.mannerPoint = Math.round(Math.random() * (5 - 0) + 0);
  user.isDelete = false;
  user.email = faker.internet.email();

  //user.products =
  //user.bids =

  return user;
});
