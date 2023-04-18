import { DELETE_ROLE, ROLE_DELETED_SUCCESSFULL } from "./actionTypes";
import {} from "./actionTypes";

export const deleteRole = (roleId) => {
  return {
    type: DELETE_ROLE,
    payload: roleId,
  };
};
export const roleDeleteResponse = (issueList) => {
  return {
    type: ROLE_DELETED_SUCCESSFULL,
    payload: issueList,
  };
};
