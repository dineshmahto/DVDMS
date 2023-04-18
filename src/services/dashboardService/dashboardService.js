import servicecall from "../servicecall/servicecall";
import toastMessage from "../../common/toastmessage/toastmessage";

const getDashboardCardData = async (endpoint, queryParam, jwt) => {
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

export default getDashboardCardData;
