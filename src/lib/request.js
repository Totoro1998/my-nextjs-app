import { IS_DEV } from "@/const/common";
import axios from "axios";

let headers = {
  Accept: "application/json",
};

if (IS_DEV) {
  headers = {
    ...headers,
    "Content-Type": "application/json",
  };
}
const httpRequest = {
  get: ({ baseUrl = process.env.API_URL, url, params }) => {
    return axios({
      timeout: 60000,
      method: "get",
      baseURL: baseUrl,
      url: url,
      headers,
      params,
    });
  },
  post: ({ baseUrl = process.env.API_URL, url, data = {} }) => {
    return axios({
      timeout: 60000,
      method: "post",
      baseURL: baseUrl,
      url: url,
      headers,
      data: {
        ...data,
      },
    });
  },
};

export default httpRequest;
