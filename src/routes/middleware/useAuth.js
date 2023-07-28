import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import tokenhandle from "../../common/tokenhandle/tokenhandle";

const useAuth = () => {
  const token = sessionStorage.getItem("PROFILE_DETAIL");

  let isDeveloper = false;
  let isAdmin = false;
  let status = "Employee";
  let username = "";

  if (token) {
    // const decoded = jwtDecode(token);
    // console.log("decoded", decoded);
    console.log("token", token);
    const { activityList, roleList, username } = JSON.parse(token);
    console.log("activitylist", activityList, username);
    // isDeveloper = roleList.includes("DEVELOPER");
    // isAdmin = roleList.includes("ADMIN");
    if (isDeveloper) status = "DEVELOPER";
    if (isAdmin) status = "ADMIN";
    return {
      username,
      activityList: activityList,
      roleList: roleList,
      status,
      isDeveloper,
      isAdmin,
    };
  }
  return {
    activityList: [],
    roleList: [],
    username,
    status,
    isDeveloper,
    isAdmin,
  };
};

export default useAuth;
