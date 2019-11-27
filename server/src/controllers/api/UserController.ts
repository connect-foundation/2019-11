import {
  JsonController,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Put,
  Delete,
  OnUndefined
} from "routing-controllers";
import { UserService } from "../../services/UserService";
import { Users } from "../../models/Users";

/** TypeDi Constructor Injection 작동 방식
 * 1. TypeDi의 Container를 routing-controllers가 사용한다.(server.ts 소스 코드 참조)
 * 2. TypeDi가 Controller로 등록된 클래스들을 알고 있다.
 * 3. TypeDi는 @Inject를 통해서 dependency를 주입하는데, 생성자 주입(Constructor Injection)의 경우 @Inject를 생략해도 된다.
 */
@JsonController("/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public find() {
    return this.userService.find();
  }

  @Get("/:id")
  public findOne(@Param("id") id: string) {
    return this.userService.findOne(parseInt(id));
  }

  @Post()
  public create(@Body() user: Users) {
    //TODO: user을 Users Model에 맞게 class-transformer를 사용해서 처리하자
    return this.userService.create(user);
  }

  @Put("/:id")
  @Patch("/:id")
  public update(@Param("id") id: string, @Body() user: Users) {
    //TODO: user을 Users Model에 맞게 class-transformer를 사용해서 처리하자
    return this.userService.update(parseInt(id), user);
  }

  @Delete("/:id")
  public delete(@Param("id") id: string) {
    return this.userService.delete(parseInt(id));
  }
}
