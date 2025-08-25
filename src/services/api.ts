import axios from "axios";

const loginApi = (username: string, password: string) => {
  const url = "http://localhost:8080/api/login";
  return axios.post(url, { username, password });
};
export { loginApi };
