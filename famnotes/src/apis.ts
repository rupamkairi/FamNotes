const api = "http://127.0.0.1:3333";

const apis = {
  baseURL: api,

  register: `${api}/auth/register`,
  login: `${api}/auth/login`,

  notes: `${api}/notes`,
};

export default apis;
