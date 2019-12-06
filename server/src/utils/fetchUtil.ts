import fetch from "node-fetch";

export const Async = (url: any, option: any, callback: Function) => {
  fetch(url, option)
    .then(res => {
      return res.json();
    })
    .then(json => {
      if (callback !== undefined) callback(json);
    });
};

export const Await = async (url: any, option: any) => {
  return await fetch(url, option)
    .then(res => {
      return res.json();
    })
    .then(json => {
      return json;
    });
};

export const Option = {
  get: { method: "GET", headers: { "User-Agent": "Mozilla/5.0" } },
  post: {
    method: "POST",
    headers: { "User-Agent": "Mozilla/5.0" }
  },
  put: { method: "PUT", headers: { "User-Agent": "Mozilla/5.0" } },
  postJson: {
    method: "POST",
    headers: { "User-Agent": "Mozilla/5.0", "Content-Type": "application/json" }
  },
  putJson: {
    method: "PUT",
    headers: { "User-Agent": "Mozilla/5.0", "Content-Type": "application/json" }
  }
};

export default { Async, Await, Option };
