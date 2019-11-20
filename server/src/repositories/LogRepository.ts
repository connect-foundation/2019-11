import { EntityRepository, EntityManager, MoreThanOrEqual} from 'typeorm';
import { Auction_logs } from '../models/Auction_logs';
import { prevDay } from '../util/DateUtils';

@EntityRepository()
export class LogReporsitory {
  constructor(private readonly em: EntityManager) {}

  public find() {
    return this.em.find(Auction_logs);
  }

  public findOne(id: number) {
    return this.em.findOne(Auction_logs, id);
  }

  public findBuyLogs(user_id : number,dayago:number,page:number,limit:number) {
    return this.em.findAndCount(Auction_logs,{
      relations:["Product"],
      where:{
          User:{Id: user_id},
          IsWinning:true,
          AuctionDate: MoreThanOrEqual(prevDay(dayago))
      },
      order: {
        AuctionDate: "DESC"
      },
      skip: (page-1)*limit,
      take: limit,
      cache: true
    });
  }


  public save(Auction_logs: Auction_logs) {
    return this.em.save(Auction_logs);
  }
}
