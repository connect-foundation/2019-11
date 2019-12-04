import {
  JsonController,
  Get,
  Param,
  Post,
  Body,
  BodyParam,
  Patch,
  Put,
  Delete,
  Req,
  Res
} from "routing-controllers";
import { UserService } from "../../services/UserService";
import { Users } from "../../models/Users";
import jwt from "jsonwebtoken";

/** TypeDi Constructor Injection 작동 방식
 * 1. TypeDi의 Container를 routing-controllers가 사용한다.(server.ts 소스 코드 참조)
 * 2. TypeDi가 Controller로 등록된 클래스들을 알고 있다.
 * 3. TypeDi는 @Inject를 통해서 dependency를 주입하는데, 생성자 주입(Constructor Injection)의 경우 @Inject를 생략해도 된다.
 */
@JsonController("/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async getUser(@Req() req: any, @Res() res: any) {
    console.log(req.headers);
    let accessToken = req.headers["access-token"];
    let refreshToken = req.headers["refresh-token"];
    try {
      const decodedAccessToken = jwt.verify(
        accessToken,
        `${process.env.JWT_KEY}`
      );
      const user = await this.userService.findOne(
        (<any>decodedAccessToken).loginId
      );
      return user;
    } catch {
      try {
        const decodedRefreshToken = jwt.verify(
          refreshToken,
          `${process.env.JWT_KEY}`
        );
        const { loginId } = <any>decodedRefreshToken;
        accessToken = await jwt.sign({ loginId }, `${process.env.JWT_KEY}`, {
          expiresIn: "2h"
        });
        const user = await this.userService.updateToken(
          loginId,
          accessToken,
          refreshToken
        );
        return user;
      } catch {
        return false;
      }
    }
  }

  @Get("/:id")
  public async findOne(@Param("id") loginId: string) {
    const user = await this.userService.findOne(loginId);
    return user;
  }

  @Post()
  public async create(
    @BodyParam("id") loginId: string,
    @BodyParam("password") password: string,
    @BodyParam("name") name: string,
    @BodyParam("email") email: string,
    @Req() req: any
  ) {
    //TODO: user을 Users Model에 맞게 class-transformer를 사용해서 처리하자
    if (await this.userService.checkDuplicate(loginId)) {
      return { msg: false, user: null };
    }

    const accessToken = await jwt.sign({ loginId }, `${process.env.JWT_KEY}`, {
      expiresIn: "2h"
    });

    const refreshToken = await jwt.sign({ loginId }, `${process.env.JWT_KEY}`, {
      expiresIn: "3 days"
    });

    const user = await this.userService.create(
      loginId,
      password,
      name,
      email,
      accessToken,
      refreshToken
    );

    return { msg: true, user };
  }

  @Put("/:id")
  @Patch("/:id")
  public update(@Param("id") id: string, @Body() user: Users) {
    //TODO: user을 Users Model에 맞게 class-transformer를 사용해서 처리하자
    // return this.userService.update(parseInt(id), user);
  }

  @Delete("/:id")
  public delete(@Param("id") id: string) {
    return this.userService.delete(parseInt(id));
  }
}
