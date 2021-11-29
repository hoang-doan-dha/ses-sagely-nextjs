import axios, { AxiosResponse } from 'axios';
import { User } from '../pages/api/login';

const API_URL = 'http://54.255.38.53:7111';

type LoginPayload = {
  username: string,
  password: string,
}

const authenticate = (payload: LoginPayload) => {
  axios.defaults.headers.common.Authorization = '';
  return axios.post(`${API_URL}/validate/authenticate`, payload);
};

const validate = () => {
  return axios.post(`${API_URL}/validate/validate`, {
    "refreshUser": false,
    "facilityHref": ""
  });
};

export const login = async (payload: LoginPayload) => {
  try {
    const authentication = await authenticate(payload);
    console.log("🚀 ~ file: index.js ~ line 19 ~ login ~ authentication", authentication.data.token)
    if (authentication.data && authentication.data.token) {
      axios.defaults.headers.post["Content-Type"] = "application/json";
      axios.defaults.headers.common.Authorization = `Bearer ${authentication.data.token}`;
      return validate();
    }
  } catch (error) {
    console.log("🚀 ~ file: index.js ~ line 22 ~ login ~ error", error)
  }
};
