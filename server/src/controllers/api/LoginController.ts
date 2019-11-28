import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as NaverStrategy } from "passport-naver";
import { Strategy as KakaoStrategy } from "passport-kakao";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { JsonController, Post, Body, BodyParam } from "routing-controllers";
import { UserService } from "../../services/UserService";

@JsonController("/login")
export class LoginController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public login(
    @BodyParam("id") loginId: string,
    @BodyParam("password") password: string
  ) {
    return this.userService.checkLogin(loginId, password);
  }
}
