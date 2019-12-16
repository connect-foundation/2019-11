import {
  Post,
  HeaderParam,
  ForbiddenError,
  ContentType,
  OnUndefined,
  OnNull,
  JsonController,
  BodyParam
} from "routing-controllers";

import s3 from "../../services/S3Service";
import { UserService } from "../../services/UserService";

@JsonController("/storage")
@ContentType("image/*")
@OnUndefined(403)
@OnNull(403)
export class StoreageController {
  constructor(private readonly userService: UserService) {}
  @Post("/image")
  public async image(
    @HeaderParam("x-auth") uid: string,
    @HeaderParam("x-timestamp") timestamp: string,
    @BodyParam("uri") data: string
  ) {
    if (uid === undefined || timestamp === undefined)
      return new ForbiddenError();

    const result = s3.creatObject("image/", data);
    return result;
  }

  @Post("/profile")
  public async profile(
    @HeaderParam("x-auth") uid: string,
    @HeaderParam("x-timestamp") timestamp: string,
    @BodyParam("uri") data: string,
    @BodyParam("id") id: number
  ) {
    if (uid === undefined || timestamp === undefined)
      return new ForbiddenError();

    const result = await s3.creatObject("profile/", data);
    const user = this.userService.updateUserProfile(id, result);
    return user;
  }
}
