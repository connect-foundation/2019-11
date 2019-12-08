import { ExpressMiddlewareInterface } from "routing-controllers";
import { UserService } from "../services/UserService";
import { UserController } from "../controllers/api/UserController";
import jwt from "jsonwebtoken";

export class JwtMiddleware implements ExpressMiddlewareInterface {
  constructor(
    private readonly userService: UserService,
    private readonly userController: UserController
  ) {}
  use(req: any, res: any, next: () => any): void {
    let accessToken = req.headers["access-token"];
    console.log(req);
    let refreshToken = req.headers["refresh-token"];
    if (accessToken === (null || undefined)) {
      res.status(403).json({
        result: false,
        msg: "not logged in"
      });
    } else {
      try {
        if (accessToken.includes("kakao_") || refreshToken.includes("kakao_")) {
          const user = this.userController.getUserKakao(
            accessToken,
            refreshToken
          );

          user.then(result => {
            if (result !== (undefined || false)) {
              next();
            } else {
              res.status(403).json({
                result: false,
                msg: "not logged in"
              });
            }
          });
        } else if (
          accessToken.includes("google_") ||
          refreshToken.includes("google_")
        ) {
          const user = this.userController.getUserGoogle(
            accessToken,
            refreshToken
          );
          user.then(result => {
            if (result !== (undefined || false)) {
              next();
            } else {
              res.status(403).json({
                result: false,
                msg: "not logged in"
              });
            }
          });
        } else {
          const decodedAccessToken = jwt.verify(
            accessToken,
            `${process.env.JWT_KEY}`
          );
          const user = this.userService.findOne(
            (<any>decodedAccessToken).loginId
          );
          user.then(result => {
            if (result !== undefined) {
              next();
            } else {
              res.status(403).json({
                result: false,
                msg: "not logged in"
              });
            }
          });
        }
      } catch {
        try {
          if (refreshToken === (null || undefined)) {
            res.status(403).json({
              result: false,
              msg: "not logged in"
            });
          } else {
            const decodedRefreshToken = jwt.verify(
              refreshToken,
              `${process.env.JWT_KEY}`
            );
            const { loginId } = <any>decodedRefreshToken;
            accessToken = jwt.sign({ loginId }, `${process.env.JWT_KEY}`, {
              expiresIn: "2h"
            });
            this.userService.updateToken(loginId, accessToken, refreshToken);
            next();
          }
        } catch {
          res.status(403).json({
            result: false,
            msg: "not logged in"
          });
        }
      }
    }
  }
}
