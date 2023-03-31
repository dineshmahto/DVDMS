import servicecall from "../servicecall/servicecall";
import toastMessage from "../../common/toastmessage/toastmessage";

const getNotificationService = async (endpoint, queryParam) => {
  return await servicecall
    .getData(endpoint, queryParam)
    .then((r) => {
      return r;
    })
    .catch((e) => {
      toastMessage("Notification List", "Server can't respon", "error");
      return e;
    });
};
const postNotificationService = async (endpoint, queryParam) => {
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



export { getNotificationService, postNotificationService };
