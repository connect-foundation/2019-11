import { Service } from 'typedi';
import { LogReporsitory } from '../repositories/LogRepository';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Auction_logs } from '../models/Auction_logs';

/** TODO: Transaction을 어떻게 처리해야 좋을까? */
@Service()
export class LogService {
  constructor(
    @InjectRepository() private readonly logRepository: LogReporsitory
  ) {}

  /** GET */
  public find() {
    return this.logRepository.find();
  }

  public findOne(id: number) {
    return this.logRepository.findOne(id);
  }

  public findBuyLogs(user_id : number) {
    return this.logRepository.findBuyLogs(user_id);
  }



  /** POST */
  public create(auction_logs: Auction_logs) {
    return this.logRepository.save(auction_logs);
  }

  /** PUT, PATCH */
  public update(id: number, auction_logs: Auction_logs) {
    /**TODO: 해당 id값으로 Entitiy를 조회해서, 새로운 user 엔티티로 변경 */
  }

  /** DELETE */
  public delete(id: number) {
    /**TODO: 해당 id값으로 Enitity 삭제 */
  }
}
