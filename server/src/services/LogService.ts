import { Service } from "typedi"
import { LogRepository } from "../repositories/LogRepository"
import { InjectRepository } from "typeorm-typedi-extensions"
import { Products } from "../models/Products"

/** TODO: Transaction을 어떻게 처리해야 좋을까? */
@Service()
export class LogService {
  constructor(@InjectRepository() private readonly LogRepository: LogRepository) {}

  /** GET */
  public find() {
    return this.LogRepository.find()
  }

  public findOne(id: number) {
    return this.LogRepository.findOne(id)
  }

  public findBuyLog(userid: number, dayago: number, page: number, limit: number) {
    return this.LogRepository.findBuy(userid, dayago, page, limit)
  }

  public findSellLog(userid: number, dayago: number, page: number, limit: number) {
    return this.LogRepository.findSell(userid, dayago, page, limit)
  }

  public findAllLog(userid: number, dayago: number, page: number, limit: number) {
    return this.LogRepository.findAll(userid, dayago, page, limit)
  }
}
