import { EntityRepository, EntityManager, MoreThanOrEqual, IsNull, Between } from "typeorm";
import { prevDay, Today } from "../util/DateUtils";
import { Products } from "../models/Products";

@EntityRepository()
export class LogRepository {
  constructor(private readonly em: EntityManager) {}

  public findBuy(userid: number, dayago: number, page: number, limit: number) {
    return this.em.findAndCount(Products, {
      relations: ["seller"],
      where: {
        soldDate: MoreThanOrEqual(prevDay(dayago)),
        buyerId: userid
      },
      order: {
        soldDate: "DESC"
      },
      skip: (page - 1) * limit,
      take: limit,
      cache: true
    });
  }

  public findSell(userid: number, dayago: number, page: number, limit: number) {
    return this.em.findAndCount(Products, {
      relations: ["seller"],
      where: {
        soldDate: MoreThanOrEqual(prevDay(dayago)),
        seller: { id: userid }
      },
      order: {
        soldDate: "DESC"
      },
      skip: (page - 1) * limit,
      take: limit,
      cache: true
    });
  }

  public findFail(userid: number, dayago: number, page: number, limit: number) {
    return this.em.findAndCount(Products, {
      relations: ["seller"],
      where: {
        soldDate: IsNull(),
        extensionDate: Between(prevDay(dayago), Today()),
        seller: { id: userid }
      },
      order: {
        registerDate: "DESC"
      },
      skip: (page - 1) * limit,
      take: limit,
      cache: true
    });
  }

  public findAll(userid: number, dayago: number, page: number, limit: number) {
    return this.em.findAndCount(Products, {
      relations: ["seller"],
      where: [
        {
          soldDate: MoreThanOrEqual(prevDay(dayago)),
          seller: { id: userid }
        },
        {
          soldDate: MoreThanOrEqual(prevDay(dayago)),
          buyerId: userid
        }
      ],
      order: {
        soldDate: "DESC"
      },
      skip: (page - 1) * limit,
      take: limit,
      cache: true
    });
  }
}
