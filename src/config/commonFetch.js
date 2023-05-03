import API from "./config";
const commonFetch = async (url, bodyData) => {
  return await API.get(url, bodyData ? bodyData : null)
    .then((respone) => {
      return respone;
    })
    .catch((error) => {
      return error;
    });
};
const commonPost = async (url, bodyData) => {
  return await API.post(url, bodyData ? bodyData : null)
    .then((respone) => {
      return respone;
    })
    .catch((error) => {
      return error?.response;
    });
};
const commonPut = async (url, bodyData) => {
  return await API.put(url, bodyData ? bodyData : null)
    .then((respone) => {
      return respone;
    })
    .catch((error) => {
      return error?.response;
    });
};

const commonDelete = async (url, bodyData) => {
  return await API.delete(url, bodyData ? bodyData : null)
    .then((respone) => {
      return respone;
    })
    .catch((error) => {
      return error?.response;
    });
};

export const Service = {
  commonFetch,
  commonPost,
  commonPut,
  commonDelete,
};
