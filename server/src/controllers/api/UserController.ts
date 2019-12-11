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
import { UserDTO } from "../../dto/UserDTO";
import { Await, Async, Option } from "../../util/fetchUtil";
import { kakao, google } from "../../constants/oauthAPIs";
import { keyValue2Str } from "../../util/StringUtils";

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
    let accessToken = req.headers["access-token"];
    let refreshToken = req.headers["refresh-token"];
    if (accessToken.includes("kakao_") || refreshToken.includes("kakao_")) {
      return await this.getUserKakao(accessToken, refreshToken);
    }
    if (accessToken.includes("google_") || refreshToken.includes("google_")) {
      return await this.getUserGoogle(accessToken, refreshToken);
    }
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
  public async createOrUpdate(
    @BodyParam("uid") id: number,
    @BodyParam("id") loginId: string,
    @BodyParam("password") password: string,
    @BodyParam("name") name: string,
    @BodyParam("email") email: string,
    @BodyParam("signUp") isSignUp: boolean,
    @Req() req: any
  ) {
    //TODO: user을 Users Model에 맞게 class-transformer를 사용해서 처리하자
    if (!isSignUp) {
      const user = await this.userService.update(
        id,
        loginId,
        password,
        name,
        email
      );
      return { msg: true, user };
    }
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
    console.log(user);
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

  public async getUserKakao(accessToken: string, refreshToken: string) {
    const user = await this.userService.findOneByToken(accessToken);
    accessToken = accessToken.replace("kakao_", "");
    refreshToken = refreshToken.replace("kakao_", "");
    const checkExpireResult = await Await(kakao.checkTokenExpired, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const { expiresInMillis } = checkExpireResult;
    if (expiresInMillis <= 0) {
      const params = {
        grant_type: "refresh_token",
        client_id: process.env.KAKAO_API_KEY,
        refresh_token: refreshToken
      };
      const paramsStr = keyValue2Str(params);
      const { access_token, refresh_token } = await Await(
        `${kakao.getToken}?${paramsStr}`,
        Option.post
      );
      if (refresh_token !== undefined) refreshToken = `kakao_${refresh_token}`;
      const { loginId, name, email, profileUrl } = <UserDTO>user;
      return await this.userService.updateAuth(
        loginId,
        name,
        email,
        profileUrl,
        `kakao_${access_token}`,
        `kakao_${refreshToken}`
      );
    }

    return user;
  }

  public async getUserGoogle(accessToken: string, refreshToken: string) {
    const user = await this.userService.findOneByToken(accessToken);
    accessToken = accessToken.replace("google_", "");
    refreshToken = refreshToken.replace("google_", "");
    const params = {
      access_token: accessToken
    };
    const paramsStr = keyValue2Str(params);
    const checkExpireResult = await Await(
      `${google.checkTokenExpired}?${paramsStr}`,
      Option.get
    );
    const { user_id } = checkExpireResult;
    console.log(checkExpireResult);

    if (user_id === undefined) {
      const params = {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        refresh_token: refreshToken,
        grant_type: "refresh_token"
      };
      const paramsStr = keyValue2Str(params);
      const { access_token } = await Await(
        `${google.getToken}?${paramsStr}`,
        Option.post
      );
      const { loginId, name, email, profileUrl } = <UserDTO>user;
      return await this.userService.updateAuth(
        loginId,
        name,
        email,
        profileUrl,
        `google_${access_token}`,
        `google_${refreshToken}`
      );
    }

    return user;
  }
}
