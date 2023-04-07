import servicecall from "../servicecall/servicecall";
import toastMessage from "../../common/toastmessage/toastmessage";

const getAdminService = async (endpoint, queryParam, jwt) => {
  console.log("jwt", jwt);
  return await servicecall
    .getData(endpoint, queryParam, jwt)
    .then((r) => {
      return r;
    })
    .catch((e) => {
      return e;
    });
};
const postAdminService = async (endpoint, queryParam) => {
  return await servicecall
    .postData(endpoint, queryParam)
    .then((r) => {
      return r;
    })
    .catch((e) => {
      toastMessage("Notification List", "Server can't respon", "error");
      return e;
    });
};

export { getAdminService, postAdminService };
