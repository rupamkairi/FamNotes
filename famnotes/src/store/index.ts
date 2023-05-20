import { writable } from "svelte/store";
import request from "../utils/request";
import apis from "../apis";

let authUser = null;

async function isAuthinticatedCheck() {
  const value = localStorage.getItem("isAuthinticated");
  const userId = localStorage.getItem("userId");

  if (value && userId) {
    authUser = await request({ url: apis.user(userId) });
  }

  return value ? Boolean(value) : false;
}

export const isAuthinticated = writable(await isAuthinticatedCheck());
export const userState = writable(authUser);
