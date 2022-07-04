import { API, APIResponse } from "@/types/api";
import axios, { AxiosRequestConfig } from "axios";

const apiPreFix = process.env.API_PREFIX;

const defaultConfig = {};

const http = axios.create({
  baseURL: apiPreFix,
});

export function get<T extends keyof API["get"]>(
  url: T,
  params?: API["get"][T],
  config?: AxiosRequestConfig
) {
  return http.get<APIResponse["get"][T]>(
    url,
    Object.assign({ params }, defaultConfig, config)
  );
}

export function post<T extends keyof API["post"]>(
  url: T,
  data: API["post"][T],
  config?: AxiosRequestConfig
) {
  return http.post<APIResponse["post"][T]>(
    url,
    data,
    Object.assign(defaultConfig, config)
  );
}

export function put<T extends keyof API["put"]>(
  url: T,
  data: API["put"][T],
  config?: AxiosRequestConfig
) {
  return http.put<APIResponse["put"][T]>(
    url,
    data,
    Object.assign(defaultConfig, config)
  );
}

export function del<T extends keyof API["delete"]>(
  url: T,
  params?: API["delete"][T],
  config?: AxiosRequestConfig
) {
  let newUrl: string = url;
  for (const matchArr of url.matchAll(/:\w+/g)) {
    const key = matchArr[0];
    // const index = matchArr.index;
    newUrl = newUrl.replace(key, params[key.slice(1)] || "");
  }

  return http.delete<APIResponse["delete"][T]>(
    newUrl,
    Object.assign({ params }, defaultConfig, config)
  );
}
