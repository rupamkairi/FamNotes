const api = "http://127.0.0.1:3333";

const apis = {
  baseURL: api,

  register: `${api}/auth/register`,
  login: `${api}/auth/login`,

  user: (id: string | number) => `${api}/users/${id}`,

  notes: `${api}/notes`,
  note: (id: string | number) => `${api}/notes/${id}`,

  viewers: (id: string | number) => `${api}/notes/${id}/viewers`,
  viewer: (id: string | number, user_id: string | number) =>
    `${api}/notes/${id}/viewers/${user_id}`,
};

export default apis;
