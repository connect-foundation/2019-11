import { Rooms } from '../../models/Rooms';
import * as Faker from 'faker';
import { define } from 'typeorm-seeding';

const regions = [
  '서울',
  '경기',
  '강원',
  '경남',
  '경북',
  '광주',
  '대구',
  '대전',
  '부산',
  '인천',
  '전남',
  '전북',
  '제주',
  '세종',
  '울산',
  '충남',
  '충북'
];

const roomTypes = ['private', 'entire', 'shared', 'hotel'];

define(Rooms, (faker: typeof Faker, settings: any): Rooms => {
  const room = new Rooms();
  room.title = faker.lorem.sentence();
  room.bathroomCounts = (faker.random.number() % 9) + 1;
  room.bedCounts = (faker.random.number() % 9) + 1;
  room.bedroomCounts = (faker.random.number() % 9) + 1;
  room.reviewCounts = faker.random.number();
  room.maxPeople = (faker.random.number() % 5) + 3;
  room.minNights = (faker.random.number() % 3) + 1;
  room.price = faker.random.number();
  room.region = regions[faker.random.number() % regions.length];
  room.roomType = roomTypes[faker.random.number() % roomTypes.length];
  room.star = (faker.random.number() % 5) + 1;
  return room;
});
