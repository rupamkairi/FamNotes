import axios from "axios";
import apis from "../apis";

enum ContentTypeEnum {
  plain = "text/plain",
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

    if (response.status >= 400) {
      console.error("Error Status", response.status, "Error", response.body);
      return null;
    }

    let data = null;
    if (response.headers.get("Content-Type").startsWith(ContentTypeEnum.json)) {
      data = response.json();
    } else if (
      response.headers.get("Content-Type").startsWith(ContentTypeEnum.plain)
    ) {
      data = response.text();
    }
    return data;
  } catch (error) {
    return null;
  }
}
