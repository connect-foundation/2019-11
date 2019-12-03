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
