import { Await, Option, Async } from "../utils/fetchUtil.js";
import { keyValue2Str } from "../utils/converter.js";

export const jsonFetch = async (url, headerOption, body) => {
  const option = Option.postJson;
  option.body = JSON.stringify(body);
  option.headers = Object.assign(option.headers, headerOption);
  const result = await Await(url, option);

  return result;
};

export const putJsonFetch = async (url, headerOption, body) => {
  const option = Option.putJson;
  option.body = JSON.stringify(body);
  option.headers = Object.assign(option.headers, headerOption);
  const result = await Await(url, option);

  return result;
};

export const getFetch = (url, headerOption, params, callback) => {
  const option = Option.get;
  option.headers = Object.assign(option.headers, headerOption);
  const paramsStr = keyValue2Str(params);
  Async(`${url}?${paramsStr}`, option, callback);
};

export default { jsonFetch, putJsonFetch };
