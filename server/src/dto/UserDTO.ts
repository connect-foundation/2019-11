import { Users } from "../models/Users";

export class UserDTO {
  constructor(user: Users, isLogin: boolean, isSnsLogin: boolean) {
    this.id = user.id;
    this.loginId = user.loginId;
    this.name = user.name;
    this.profileUrl = user.profileUrl;
    this.mannerPoint = user.mannerPoint;
    this.email = user.email;
    this.accessToken = user.accessToken;
    this.refreshToken = user.refreshToken;
    this.isLogin = isLogin;
    this.isSnsLogin = isSnsLogin;
  }
  id: number;
  loginId: string;
  name: string;
  profileUrl: string;
  mannerPoint: number;
  email: string;
  accessToken: string;
  refreshToken: string;
  isLogin: Boolean;
  isSnsLogin: Boolean;
}
