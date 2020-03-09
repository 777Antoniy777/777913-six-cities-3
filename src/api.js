import axios from "axios";

const BASE_URL = `https://htmlacademy-react-3.appspot.com/six-cities`;

const createAPI = (onUnauthorized) => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    withCredentials: true,
  });

  return instance;
};

export default createAPI;

