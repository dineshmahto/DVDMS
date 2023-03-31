import toastMessage from "../../common/toastmessage/toastmessage";
import tokenhandle from "../../common/tokenhandle/tokenhandle";
import servicecall from "../servicecall/servicecall";
const loginservice = async (endpoint, data) => {
  // console.log(endpoint, data);
  // console.log(
  //   process.env.REACT_APP_SECRET_KEY,
  //   process.env.REACT_APP_SERVER_API_BASE_URL
  // );
  return await servicecall
    .postData(endpoint, data)
    .then((r) => {
      console.log(r);
      if (r.status === 200) {
        tokenhandle.storetoken(r.data.token);
        tokenhandle.storeProfileDetails(r?.data?.displayName);
      }
      return r;
    })
    .catch((e) => {
      // console.log("Error");
      if (e.response.status !== 400) {
        toastMessage("Login Error", "Server can't respon", "error");
      }
      // console.log(tokenhandle.getToken());
      return e;
    });
};

export default loginservice;
