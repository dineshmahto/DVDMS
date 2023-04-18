import API from "./config";
const commonFetch = async (url, bodyData) => {
  return await API.get(url, bodyData ? bodyData : null)
    .then((respone) => {
      return respone;
    })
    .catch((error) => {
      console.log("Error", error);
      return error;
    });
};
const commonPost = async (url, bodyData) => {
  return await API.post(url, bodyData ? bodyData : null)
    .then((respone) => {
      return respone;
    })
    .catch((error) => {
      return error;
    });
};

export const Service = {
  commonFetch,
  commonPost,
};
