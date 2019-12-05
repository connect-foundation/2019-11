import {
  JsonController,
  Post,
  BodyParam,
  Req,
  Res,
  Get
} from "routing-controllers";
import { UserService } from "../../services/UserService";
import { Users } from "../../models/Users";
import jwt from "jsonwebtoken";
import uuid from "uuid";
import fetch from "node-fetch";

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
    if (msg) {
      const accessToken = await jwt.sign(
        { loginId },
        `${process.env.JWT_KEY}`,
        { expiresIn: "2h" }
      );

      const refreshToken = await jwt.sign(
        { loginId },
        `${process.env.JWT_KEY}`,
        { expiresIn: "3 days" }
      );
      const user = await this.userService.updateToken(
        loginId,
        accessToken,
        refreshToken
      );
      return { msg, user };
    }
    return { msg, user: null };
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
    const { id_token, access_token, refresh_token } = await fetch(
      `https://oauth2.googleapis.com/token?code=${authCode}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&redirect_uri=postmessage&grant_type=authorization_code`,
      {
        method: "POST"
      }
    )
      .then(result => result.json())
      .then(result => {
        console.log(result);
        return result;
      });
    const { sub, email, name, picture } = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${id_token}`
    )
      .then(result => result.json())
      .then(result => result);
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
  public async logout(@Req() req: any, @Res() res: any) {
    // const sess = req.session;
    // if (sess.username) {
    //   sess.destroy();
    //   res.clearCookie("connect.sid");
    //   return true;
    // }
    // return false;
  }
}
