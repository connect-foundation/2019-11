import { Service } from "typedi";
import { UserRepository } from "../repositories/UserRepository";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Users } from "../models/Users";
import { encryptPassword, checkPassword } from "../util/passwordUtils";
import { UserDTO } from "../dto/UserDTO";

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

  public async findOne(loginId: string) {
    const result = await this.userRepository.findOne(loginId);
    if (result !== undefined) {
      const userResponse = new UserDTO();
      userResponse.id = result.id;
      userResponse.loginId = result.loginId;
      userResponse.name = result.name;
      userResponse.email = result.email;
      userResponse.mannerPoint = result.mannerPoint;
      userResponse.profileUrl = result.profileUrl;
      userResponse.accessToken = result.accessToken;
      userResponse.refreshToken = result.refreshToken;
      return userResponse;
    }
    return result;
  }

  /** POST */
  public async create(
    loginId: string,
    password: string,
    name: string,
    email: string,
    accessToken: string,
    refreshToken: string
  ) {
    const user = new Users();
    const { salt, result } = encryptPassword(password);
    user.loginId = loginId;
    user.salt = salt;
    user.password = result;
    user.name = name;
    user.email = email;
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;

    const res = await this.userRepository.save(user);
    const userResponse = new UserDTO();
    userResponse.id = res.id;
    userResponse.loginId = res.loginId;
    userResponse.name = res.name;
    userResponse.email = res.email;
    userResponse.mannerPoint = res.mannerPoint;
    userResponse.profileUrl = res.profileUrl;
    userResponse.accessToken = res.accessToken;
    userResponse.refreshToken = res.refreshToken;

    return userResponse;
  }

  public async checkDuplicate(loginId: string) {
    const result = await this.userRepository.findOne(loginId);
    if (result === undefined) {
      return false;
    }
    return true;
  }

  /** PUT, PATCH */
  public async updateToken(
    loginId: string,
    accessToken: string,
    refreshToken: string
  ) {
    /**TODO: 해당 id값으로 Entitiy를 조회해서, 새로운 user 엔티티로 변경 */
    const user = await this.userRepository.findOne(loginId);
    if (user === undefined) {
      return false;
    } else {
      user.accessToken = accessToken;
      user.refreshToken = refreshToken;
      const result = await this.userRepository.save(user);
      const userResponse = new UserDTO();
      userResponse.id = result.id;
      userResponse.loginId = result.loginId;
      userResponse.name = result.name;
      userResponse.email = result.email;
      userResponse.mannerPoint = result.mannerPoint;
      userResponse.profileUrl = result.profileUrl;
      userResponse.accessToken = result.accessToken;
      userResponse.refreshToken = result.refreshToken;

      return userResponse;
    }
  }

  /** DELETE */
  public delete(id: number) {
    /**TODO: 해당 id값으로 Enitity 삭제 */
  }

  public async checkLogin(loginId: string, password: string) {
    const user = await this.userRepository.findOne(loginId);
    if (user === undefined) return { msg: false, result: new Users() };
    const result = checkPassword(password, user.password, user.salt);
    return result === true ? { msg: true } : { msg: false };
  }
}
