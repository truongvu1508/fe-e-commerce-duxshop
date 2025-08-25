import axios from "axios";

const loginApi = (username: string, password: string) => {
  const url = "http://localhost:8080/api/login";
  return axios.post(url, { username, password });
};

const getAccountApi = (access_token: string) => {
  const url = "http://localhost:8080/api/account";
  return axios.get(url, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
export { loginApi, getAccountApi };
