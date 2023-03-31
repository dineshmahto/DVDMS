import config from "../utils/config.json";
import tokenhandle from "../common/tokenhandle/tokenhandle";

const commonFetch = async (url, Method, bodyData) => {
  const URL = config.DEV_BASE_URL + url;
  let headerComponent = {
    method: Method,
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + tokenhandle.getToken(),
    },
    body: bodyData ? JSON.stringify(bodyData) : null,
  };
  const result = await fetch(URL, headerComponent);
  console.log("result", result);
  return await result.json();
};

export const Service = {
  commonFetch,
};
