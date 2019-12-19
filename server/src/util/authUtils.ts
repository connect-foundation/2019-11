import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "../config/key";

const { jwtSecret } = config;

export function encryptPassword(password: string) {
  const salt = crypto.randomBytes(30).toString("base64");
  const key = crypto.pbkdf2Sync(password, salt, 102935, 30, "sha512");
  return { salt, result: key.toString("base64") };
}

export function checkPassword(
  inputPwd: string,
  encryptedPwd: string,
  salt: string
) {
  const key = crypto.pbkdf2Sync(inputPwd, salt, 102935, 30, "sha512");
  return key.toString("base64") === encryptedPwd;
}

export const checkIsSnsLogin = (token: string) =>
  token.includes("kakao_") || token.includes("google_") ? true : false;

export const makeTokens = (loginId: string) => {
  const accessToken = jwt.sign({ loginId }, `${jwtSecret}`, {
    expiresIn: "2h"
  });

  const refreshToken = jwt.sign({ loginId }, `${jwtSecret}`, {
    expiresIn: "3 days"
  });

  return { accessToken, refreshToken };
};

export const replaceOAuthToken = (
  oauth: string,
  accessToken: string,
  refreshToken: string
) => {
  const at = accessToken.replace(`${oauth}_`, "");
  const rt = refreshToken.replace(`${oauth}_`, "");
  return { at, rt };
};
