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

@JsonController("/storage")
@ContentType("image/*")
@OnUndefined(403)
@OnNull(403)
export class StoreageController {
  @Post("/image")
  public async image(
    @HeaderParam("x-auth") uid: string,
    @HeaderParam("x-timestamp") timestamp: string,
    @BodyParam("uri") data: string
  ) {
    if (uid === undefined || timestamp === undefined) return new ForbiddenError();

    const result = s3.creatObject("image/", data);
    return result;
  }

  @Post("/profile")
  public async profile(
    @HeaderParam("x-auth") uid: string,
    @HeaderParam("x-timestamp") timestamp: string,
    @BodyParam("uri") data: string
  ) {
    if (uid === undefined || timestamp === undefined) return new ForbiddenError();

    const result = s3.creatObject("profile/", data);
    return result;
  }
}
