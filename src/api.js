import axios from "axios";

const BASE_URL = `https://htmlacademy-react-3.appspot.com/six-cities`;

const Error = {
  UNAUTHORIZED: 401,
};

const createAPI = (onUnauthorized) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    withCredentials: true,
  });

  return axiosInstance;
};

export default createAPI;

