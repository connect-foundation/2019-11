import {
  Post,
  HeaderParam,
  ForbiddenError,
  ContentType,
  OnUndefined,
  OnNull,
  JsonController,
  BodyParam
} from "routing-controllers"

import AWS from "aws-sdk"
AWS.config.update({})

@JsonController("/downloader")
@ContentType("image/*")
@OnUndefined(403)
@OnNull(403)
export class StoreageController {
  @Post()
  public async upload(
    @HeaderParam("x-auth") uid: string,
    @HeaderParam("x-timestamp") timestamp: number,
    @BodyParam("uri") data: string
  ) {
    if (uid === undefined || timestamp === undefined) return new ForbiddenError()

    const rawData = new Buffer(data, "base64")

    return rawData
  }
}
