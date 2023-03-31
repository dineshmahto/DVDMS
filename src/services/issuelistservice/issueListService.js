import servicecall from "../servicecall/servicecall";
import toastMessage from "../../common/toastmessage/toastmessage";

const issueListService = async (endpoint, queryParam) => {
  return await servicecall
    .getData(endpoint, queryParam)
    .then((r) => {
      return r;
    })
    .catch((e) => {
      // toastMessage("Issue List", "Server can't respon", "error");
      return e;
    });
};

export default issueListService;
