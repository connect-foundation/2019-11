import AWS from "aws-sdk";
import { randomFileName } from "../util/StringUtils";
import objectStorage from "../config/objectStorage";

const { END_POINT, REGION, ACCESS_KEY, SECRET_KEY } = process.env;
const { Bucket } = objectStorage;

AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY
});

const S3 = new AWS.S3({
  endpoint: END_POINT,
  region: REGION
});

const creatObject = async (path: string, data: string) => {
  const rawData = new Buffer(data, "base64");
  const Key = `${path}${randomFileName()}`;

  const result = await S3.putObject({
    Bucket: String(Bucket),
    Key,
    ACL: "public-read",
    Body: rawData
  }).promise();

  return `${END_POINT}/${Bucket}/${Key}`;
};

const deleteObject = async (url: string) => {
  const getFile = url.replace(String(END_POINT), "");

  S3.deleteObject({
    Bucket: String(Bucket),
    Key: getFile
  }).promise();
};

export default { creatObject, deleteObject };
