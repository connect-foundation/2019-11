// import { Users } from '../../models/Users';
// import * as Faker from 'faker';
// import { define } from 'typeorm-seeding';

// define(Users, (faker: typeof Faker, settings: any): Users => {
//   const user = new Users();
//   faker.locale = 'ko';
//   user.name = `${faker.name.lastName()}${faker.name.firstName()}`;
//   faker.locale = 'en';
//   user.loginId = faker.lorem.word();
//   user.password = faker.random.number().toString();
//   user.super = !!(faker.random.number() % 2);

//   return user;
// });
