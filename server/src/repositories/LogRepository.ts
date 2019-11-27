import { EntityRepository, EntityManager, MoreThanOrEqual } from "typeorm"
import { prevDay } from "../util/DateUtils"
import { Products } from "../models/Products"
import { Users } from "../models/Users"

@EntityRepository()
export class LogRepository {
  constructor(private readonly em: EntityManager) {}

  public find() {
    return this.em.find(Products)
  }
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
    })
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
    })
  }

  public findOne(id: number) {
    return this.em.findOne(Products, id)
  }
}
