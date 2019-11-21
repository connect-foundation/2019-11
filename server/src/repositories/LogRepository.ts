import { EntityRepository, EntityManager, MoreThanOrEqual} from 'typeorm';
import { AuctionLogs } from '../models/AuctionLogs';
import { prevDay } from '../util/DateUtils';

@EntityRepository()
export class LogReporsitory {
  constructor(private readonly em: EntityManager) {}

  public find() {
    return this.em.find(AuctionLogs);
  }

  public findOne(id: number) {
    return this.em.findOne(AuctionLogs, id);
  }

  public findBuyLogs(user_id : number,dayago:number,page:number,limit:number) {
    return this.em.findAndCount(AuctionLogs,{
      relations:["product"],
      where:{
          User:{id: user_id},
          isWinning:true,
          auctionDate: MoreThanOrEqual(prevDay(dayago))
      },
      order: {
        auctionDate: "DESC"
      },
      skip: (page-1)*limit,
      take: limit,
      cache: true
    });
  }


  public save(auctionLogs: AuctionLogs) {
    return this.em.save(auctionLogs);
  }
}
