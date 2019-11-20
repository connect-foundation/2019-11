import { EntityRepository, EntityManager } from 'typeorm';
import { Auction_logs } from '../models/Auction_logs';

@EntityRepository()
export class LogReporsitory {
  constructor(private readonly em: EntityManager) {}

  public find() {
    return this.em.find(Auction_logs);
  }

  public findOne(id: number) {
    return this.em.findOne(Auction_logs, id);
  }

  public findBuyLogs(user_id : number) {
    return this.em.find(Auction_logs,{
        where:{
            User:{Id: user_id},
            IsWinning:true
        }
    });
  }


  public save(Auction_logs: Auction_logs) {
    return this.em.save(Auction_logs);
  }
}
