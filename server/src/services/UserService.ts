import { Service } from "typedi";
import { UserRepository } from "../repositories/UserRepository";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Users } from "../models/Users";
import { encryptPassword, checkPassword } from "../util/passwordUtils";

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

  public findOne(loginId: string) {
    return this.userRepository.findOne(loginId);
  }

  /** POST */
  public create(
    loginId: string,
    password: string,
    name: string,
    email: string
  ) {
    const user = new Users();
    const { salt, result } = encryptPassword(password);
    user.loginId = loginId;
    user.salt = salt;
    user.password = result;
    user.name = name;
    user.email = email;

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

  public async checkLogin(loginId: string, password: string) {
    const user = await this.userRepository.findOne(loginId);
    if (user === undefined) return { msg: false, result: new Users() };
    const result = checkPassword(password, user.password, user.salt);
    return result === true
      ? { msg: true, result: user }
      : { msg: false, result: new Users() };
  }
}
