import servicecall from "../servicecall/servicecall";
import toastMessage from "../../common/toastmessage/toastmessage";

const logoutService = async (endpoint, data) => {
  return await servicecall
    .postData(endpoint, data)
    .then((r) => {
      return r;
    })
    .catch((e) => {
      toastMessage("Logout", "Server can't respon", "error");
      return e;
    });
};

export default logoutService;
