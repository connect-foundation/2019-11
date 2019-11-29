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
import { randomFileName } from "../../util/StringUtils"

const { END_POINT, REGION, ACCESS_KEY, SECRET_KEY, BUCKET } = process.env

AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY
})

const S3 = new AWS.S3({
  endpoint: END_POINT,
  region: REGION
})

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
    const Key = randomFileName()

    const result = await S3.putObject({
      Bucket: String(BUCKET),
      Key,
      ACL: "public-read",
      Body: rawData
    }).promise()

    return `${END_POINT}/${BUCKET}/${Key}`
  }
}
