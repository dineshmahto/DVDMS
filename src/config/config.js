import axios from "axios";
const API = axios.create({
  baseURL: process.env.REACT_APP_API_END_POINT,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "content-type": "application/json",
    Accept: "application/json",
  },
  timeout: 5000,
});

API.interceptors.request.use(
  function (config) {
    const token = sessionStorage.getItem("DVDMS_KEEP_SECRET");
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
API.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default API;
