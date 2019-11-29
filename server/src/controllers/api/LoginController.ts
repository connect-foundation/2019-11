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

@JsonController("/sign")
export class LoginController {
  constructor(private readonly userService: UserService) {}

  @Post("/login")
  public async login(
    @BodyParam("username") loginId: string,
    @BodyParam("password") password: string,
    @Req() req: any
  ) {
    const { msg, result } = await this.userService.checkLogin(
      loginId,
      password
    );
    if (msg) {
      const user = {
        id: result.id,
        username: result.loginId,
        name: result.name,
        email: result.email
      };
      const session = req.session;
      session.username = result.loginId;
      session.name = result.name;
      return { msg, user };
    }
    return { msg, user: null };
  }

  @Get("/logout")
  public async logout(@Req() req: any, @Res() res: any) {
    const sess = req.session;
    if (sess.username) {
      sess.destroy();
      res.clearCookie("connect.sid");
      return true;
    }
    return false;
  }
}
