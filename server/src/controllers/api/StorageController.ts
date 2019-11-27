import {
  Controller,
  Post,
  HeaderParam,
  ForbiddenError,
  ContentType,
  OnUndefined,
  OnNull,
  BodyParam
} from "routing-controllers"

import AWS from "aws-sdk"
AWS.config.update({})

@Controller("/downloader")
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

    const rawData = atob(data)
  }
}
