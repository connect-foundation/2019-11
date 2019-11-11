import { Service } from 'typedi';
import { RoomRepository } from '../repositories/RoomRepository';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Rooms } from '../models/Rooms';

/** TODO: Transaction을 어떻게 처리해야 좋을까? */
@Service()
export class RoomService {
  constructor(
    @InjectRepository() private readonly roomRepository: RoomRepository
  ) {}

  /** GET */
  public find() {
    return this.roomRepository.find();
  }

  public findOne(id: number) {
    return this.roomRepository.findOne(id);
  }

  /** POST */
  public create(room: Rooms) {
    return this.roomRepository.save(room);
  }

  /** PUT, PATCH */
  public update(id: number, room: Rooms) {
    /**TODO: 해당 id값으로 Entitiy를 조회해서, 새로운 room 엔티티로 변경 */
  }

  /** DELETE */
  public delete(id: number) {
    /**TODO: 해당 id값으로 Enitity 삭제 */
  }
}
