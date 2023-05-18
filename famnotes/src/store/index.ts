import { writable } from "svelte/store";

function isAuthinticatedCheck() {
  const value = localStorage.getItem("isAuthinticated");
  return value ? Boolean(value) : false;
}

export const isAuthinticated = writable(isAuthinticatedCheck());
