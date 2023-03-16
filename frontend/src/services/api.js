import axios from "axios";

const handleSuccessRequest = (req) => {
  return req;
};

const handleError = () => {
  return Promise.reject("Something went wrong.");
};

export const BASE_URL = "http://localhost:3002/api";

export const getAxiosInstance = () => {
  const config = {
    baseURL: BASE_URL,
    responseType: "json",
    headers: {
      "content-type": "application/json",
    },
  };

  const instance = axios.create(config);

  instance.interceptors.request.use(handleSuccessRequest, handleError);

  return instance;
};
