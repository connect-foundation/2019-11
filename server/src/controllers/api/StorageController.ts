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
import objectStorage from "../../config/objectStorage"

const { END_POINT, REGION, ACCESS_KEY, SECRET_KEY } = process.env
const { Bucket } = objectStorage

AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY
})

const S3 = new AWS.S3({
  endpoint: END_POINT,
  region: REGION
})

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
    if (uid === undefined || timestamp === undefined) return new ForbiddenError()

    const rawData = new Buffer(data, "base64")
    const Key = `image/${randomFileName()}`

    const result = await S3.putObject({
      Bucket: String(Bucket),
      Key,
      ACL: "public-read",
      Body: rawData
    }).promise()

    return `${END_POINT}/${Bucket}/${Key}`
  }

  @Post("/profile")
  public async profile(
    @HeaderParam("x-auth") uid: string,
    @HeaderParam("x-timestamp") timestamp: string,
    @BodyParam("uri") data: string
  ) {
    if (uid === undefined || timestamp === undefined) return new ForbiddenError()

    const rawData = new Buffer(data, "base64")
    const Key = `profile/${randomFileName()}`

    const result = await S3.putObject({
      Bucket: String(Bucket),
      Key,
      ACL: "public-read",
      Body: rawData
    }).promise()

    return `${END_POINT}/${Bucket}/${Key}`
  }
}
