import crypto from "crypto";

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
