import servicecall from "../servicecall/servicecall";
import toastMessage from "../../common/toastmessage/toastmessage";

const programlistservice = async (endpoint, queryParam) => {
  return await servicecall
    .getData(endpoint, queryParam)
    .then((r) => {
      return r;
    })
    .catch((e) => {
      toastMessage("Program List", "Server can't respon", "error");
      return e;
    });
};

export default programlistservice;
