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

const getUsersApi = () => {
  const access_token = localStorage.getItem("access_token");
  const url = "http://localhost:8080/api/users";
  return axios.get(url, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

const createUserApi = (
  fullName: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  const access_token = localStorage.getItem("access_token");
  const url = "http://localhost:8080/api/users";
  return axios.post(
    url,
    { fullName, email, password, confirmPassword },
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );
};

const updateUserApi = (
  id: string,
  fullName: string,
  address: string,
  phone: string
) => {
  const access_token = localStorage.getItem("access_token");
  const url = `http://localhost:8080/api/users/${id}`;
  return axios.put(
    url,
    { fullName, address, phone },
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );
};

const deleteUsersApi = (id: string) => {
  const access_token = localStorage.getItem("access_token");
  const url = `http://localhost:8080/api/users/${id}`;
  return axios.delete(url, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export {
  loginApi,
  getAccountApi,
  getUsersApi,
  createUserApi,
  updateUserApi,
  deleteUsersApi,
};
