import { Service } from "typedi";
import { UserRepository } from "../repositories/UserRepository";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Users } from "../models/Users";

/** TODO: Transaction을 어떻게 처리해야 좋을까? */
@Service()
export class UserService {
  constructor(
    @InjectRepository() private readonly userRepository: UserRepository
  ) {}

  /** GET */
  public find() {
    return this.userRepository.find();
  }

  public findOne(id: number) {
    return this.userRepository.findOne(id);
  }

  /** POST */
  public create(user: Users) {
    return this.userRepository.save(user);
  }

  /** PUT, PATCH */
  public update(id: number, user: Users) {
    /**TODO: 해당 id값으로 Entitiy를 조회해서, 새로운 user 엔티티로 변경 */
  }

  /** DELETE */
  public delete(id: number) {
    /**TODO: 해당 id값으로 Enitity 삭제 */
  }

  public checkLogin(loginId: string, password: string) {
    return this.userRepository.login(loginId, password);
  }
}
