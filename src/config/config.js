import axios from "axios";
const API = axios.create({
  baseURL: process.env.REACT_APP_API_END_POINT,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "content-type": "application/json",
    Accept: "application/json",
  },
  timeout: 20000,
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
  async (err) => {
    const originalConfig = err.config;

    if (err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await API.post("/auth/refresh-token", {
            refreshToken: window.localStorage.getItem("refresh_token"),
          });
          console.log("refershTOkenResp", rs);
          const { accessToken } = rs.data;
          window.sessionStorage.setItem("DVDMS_KEEP_SECRET", accessToken);
          API.defaults.headers["Authorization"] = `Bearer ${accessToken}`;

          return API(originalConfig);
        } catch (_error) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }

          return Promise.reject(_error);
        }
      }

      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }

    return Promise.reject(err);
  }
);
export default API;
