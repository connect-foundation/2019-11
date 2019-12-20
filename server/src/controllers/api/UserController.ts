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
import { fetchToJson, option } from "../../util/fetchUtil";
import { kakao, google } from "../../constants/oauthAPIs";
import { keyValue2Str } from "../../util/StringUtils";
import { makeTokens, replaceOAuthToken } from "../../util/authUtils";
import config from "../../config/key";

const { googleKey, kakaoKey, jwtSecret } = config;

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
      return this.getUserKakao(accessToken, refreshToken);
    }
    if (accessToken.includes("google_") || refreshToken.includes("google_")) {
      return this.getUserGoogle(accessToken, refreshToken);
    }
    const decodedAccessToken = jwt.verify(accessToken, `${jwtSecret}`);

    if ((<any>decodedAccessToken).loginId) {
      return this.userService.findOne((<any>decodedAccessToken).loginId);
    }

    const decodedRefreshToken = jwt.verify(refreshToken, `${jwtSecret}`);
    const { loginId } = <any>decodedRefreshToken;

    if (!loginId) {
      return false;
    }

    try {
      accessToken = jwt.sign({ loginId }, `${jwtSecret}`, {
        expiresIn: "2h"
      });
    } catch {
      return false;
    }

    return this.userService.updateToken(loginId, accessToken, refreshToken);
  }

  @Get("/:id")
  public async findOne(@Param("id") loginId: string) {
    return this.userService.findOne(loginId);
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
    const { accessToken, refreshToken } = makeTokens(loginId);

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

  public async getUserKakao(accessToken: string, refreshToken: string) {
    const user = await this.userService.findOneByToken(accessToken);
    let { at, rt } = replaceOAuthToken("kakao", accessToken, refreshToken);
    const checkExpireResult = await fetchToJson(kakao.checkTokenExpired, {
      headers: { Authorization: `Bearer ${at}` }
    });
    const { expiresInMillis } = checkExpireResult;
    if (expiresInMillis <= 0) {
      const params = {
        grant_type: "refresh_token",
        client_id: kakaoKey.APIKey,
        refresh_token: rt
      };
      const paramsStr = keyValue2Str(params);
      const { access_token, refresh_token } = await fetchToJson(
        `${kakao.getToken}?${paramsStr}`,
        option.post
      );
      if (refresh_token !== undefined) rt = `kakao_${refresh_token}`;
      const { loginId, name, email, profileUrl } = <UserDTO>user;
      return this.userService.updateAuth(
        loginId,
        name,
        email,
        profileUrl,
        `kakao_${access_token}`,
        `kakao_${rt}`
      );
    }
    return user;
  }

  public async getUserGoogle(accessToken: string, refreshToken: string) {
    const user = await this.userService.findOneByToken(accessToken);
    const { at, rt } = replaceOAuthToken("google", accessToken, refreshToken);
    const params = {
      access_token: at
    };
    const paramsStr = keyValue2Str(params);
    const checkExpireResult = await fetchToJson(
      `${google.checkTokenExpired}?${paramsStr}`,
      option.get
    );
    const { user_id } = checkExpireResult;

    if (user_id === undefined) {
      const params = {
        client_id: googleKey.clientId,
        client_secret: googleKey.clientSecret,
        refresh_token: rt,
        grant_type: "refresh_token"
      };
      const paramsStr = keyValue2Str(params);
      const { access_token } = await fetchToJson(
        `${google.getToken}?${paramsStr}`,
        option.post
      );
      const { loginId, name, email, profileUrl } = <UserDTO>user;
      return this.userService.updateAuth(
        loginId,
        name,
        email,
        profileUrl,
        `google_${access_token}`,
        `google_${rt}`
      );
    }

    return user;
  }

  @Post("/idx")
  public findOnebyIdx(@BodyParam("id") id: number) {
    return this.userService.findOnebyIdx(id);
  }
}
