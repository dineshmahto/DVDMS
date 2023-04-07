import servicecall from "../servicecall/servicecall";
const getService = async (endpoint, queryParam) => {
  return await servicecall
    .getData(endpoint, queryParam)
    .then((r) => {
      return r;
    })
    .catch((e) => {
      return e;
    });
};
const postService = async (endpoint, queryParam) => {
  return await servicecall
    .postData(endpoint, queryParam)
    .then((r) => {
      return r;
    })
    .catch((e) => {
      return e;
    });
};

export { getService, postService };
