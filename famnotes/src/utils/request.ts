import axios from "axios";
import apis from "../apis";

enum ContentTypeEnum {
  json = "application/json",
  formData = "multipart/form-data",
}

interface RequestOptions {
  method?: string;
  url?: string;
  query?: string;
  body?: any;
  contentType?: ContentTypeEnum;
}

export default async function request({
  method = "GET",
  url = apis.baseURL,
  query = "",
  body = null,
  contentType = ContentTypeEnum.json,
}: RequestOptions) {
  try {
    const headers = new Headers();
    headers.append("Content-Type", contentType);

    const response = await fetch(url + query, {
      method,
      headers,
      body: method.toUpperCase() === "GET" ? null : JSON.stringify(body),
      credentials: "include",
    });
    const data = response.json();
    return data;

    return data;
  } catch (error) {}
}
