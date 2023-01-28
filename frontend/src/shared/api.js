import axios from "axios";

export const api = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://f1rstweb.shop/",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});
