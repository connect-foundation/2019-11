import { Service } from 'typedi';
import { ReservationReporsitory } from '../repositories/ReservationRepository';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Reservations } from '../models/Reservations';

/** TODO: Transaction을 어떻게 처리해야 좋을까? */
@Service()
export class ReservationService {
  constructor(
    @InjectRepository()
    private readonly reservationRepository: ReservationReporsitory
  ) {}

  /** GET */
  public find() {
    return this.reservationRepository.find();
  }

  public findOne(id: number) {
    return this.reservationRepository.findOne(id);
  }

  /** POST */
  public create(reservation: Reservations) {
    return this.reservationRepository.save(reservation);
  }

  /** PUT, PATCH */
  public update(id: number, reservation: Reservations) {
    /**TODO: 해당 id값으로 Entitiy를 조회해서, 새로운 reservation 엔티티로 변경 */
  }

  /** DELETE */
  public delete(id: number) {
    /**TODO: 해당 id값으로 Enitity 삭제 */
  }
}
