import { Images } from "./../../models/Images";
import * as Faker from "faker";
import { define } from "typeorm-seeding";

const randomBetween = (min: number, max: number) => {
  return Math.round(Math.random() * (max - min) + min);
};

define(Images, (faker: typeof Faker, settings: any): Images => {
  const image = new Images();
  image.imageUrl = `https://picsum.photos/id/${settings.index}/500/500`;
  //image.product
  return image;
});
