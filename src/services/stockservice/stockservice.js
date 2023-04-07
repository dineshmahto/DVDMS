import servicecall from "../servicecall/servicecall";
import toastMessage from "../../common/toastmessage/toastmessage";

const getStockservice = async (endpoint, queryParam) => {
  return await servicecall
    .getData(endpoint, queryParam)
    .then((r) => {
      return r;
    })
    .catch((e) => {
      toastMessage("Stock Service", "Server can't respon", "error");
      return e;
    });
};

const postStockService = async (endpoint, queryParam) => {
  return await servicecall
    .postData(endpoint, queryParam)
    .then((r) => {
      return r;
    })
    .catch((e) => {
      toastMessage("Stock Service", "Server can't respon", "error");
      return e;
    });
};
export { getStockservice, postStockService };
