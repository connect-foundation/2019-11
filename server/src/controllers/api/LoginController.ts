import {
  JsonController,
  Post,
  BodyParam,
  Req,
  Res,
  Get
} from "routing-controllers";
import { UserService } from "../../services/UserService";
import uuid from "uuid";
import { google } from "../../constants/oauthAPIs";
import { fetchToJson, option } from "../../util/fetchUtil";
import { makeTokens } from "../../util/authUtils";
import { keyValue2Str } from "../../util/StringUtils";
import config from "../../config/key";

const { googleKey } = config;

@JsonController("/sign")
export class LoginController {
  constructor(private readonly userService: UserService) {}

  @Post("/login")
  public async login(
    @BodyParam("username") loginId: string,
    @BodyParam("password") password: string,
    @Req() req: any
  ) {
    const { msg } = await this.userService.checkLogin(loginId, password);
    if (!msg) return { msg, user: null };

    const { accessToken, refreshToken } = makeTokens(loginId);
    const user = await this.userService.updateToken(
      loginId,
      accessToken,
      refreshToken
    );
    return { msg, user };
  }

  @Post("/kakao")
  public async authKakao(
    @BodyParam("id") loginId: string,
    @BodyParam("name") name: string,
    @BodyParam("email") email: string,
    @BodyParam("profileUrl") profileUrl: string,
    @Req() req: any
  ) {
    const accessToken = `kakao_${req.headers["access-token"]}`;
    const refreshToken = `kakao_${req.headers["refresh-token"]}`;

    if (await this.userService.checkDuplicate(loginId)) {
      const user = await this.userService.updateAuth(
        loginId,
        name,
        email,
        profileUrl,
        accessToken,
        refreshToken
      );
      return { msg: true, user };
    }
    const password = uuid();
    const user = await this.userService.createAuth(
      loginId,
      password,
      name,
      email,
      profileUrl,
      accessToken,
      refreshToken
    );

    return { msg: true, user };
  }

  @Post("/google")
  public async authGoogle(@Req() req: any) {
    const authCode = req.headers["auth-code"];
    const params = {
      code: authCode,
      client_id: googleKey.clientId,
      client_secret: googleKey.clientSecret,
      redirect_uri: "postmessage",
      grant_type: "authorization_code"
    };
    const paramsStr = keyValue2Str(params);
    const { id_token, access_token, refresh_token } = await fetchToJson(
      `${google.getAccess}?${paramsStr}`,
      option.post
    );
    const { sub, email, name, picture } = await fetchToJson(
      `${google.getUserInfo}?id_token=${id_token}`,
      option.get
    );
    const accessToken = `google_${access_token}`;
    const refreshToken = `google_${refresh_token}`;
    if (await this.userService.checkDuplicate(sub)) {
      const user = await this.userService.updateAuth(
        sub,
        name,
        email,
        picture,
        accessToken,
        refreshToken
      );
      return { msg: true, user };
    }

    const password = uuid();
    const user = await this.userService.createAuth(
      sub,
      password,
      name,
      email,
      picture,
      accessToken,
      refreshToken
    );
    return { msg: true, user };
  }

  @Get("/logout")
  public async logout(@Req() req: any, @Res() res: any) {}
}
