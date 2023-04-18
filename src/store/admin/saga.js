import { call, put, takeEvery } from "redux-saga/effects";
import { roleDeleteResponse } from "./action";
import { Service } from "../../config/commonFetch";

import { DELETE_ROLE, ROLE_DELETED_SUCCESSFULL } from "./actionTypes";

function* deleteRoleById({ payload: roleId }) {
  console.log("RoleId", roleId);
  try {
    const response = yield call(
      Service.commonFetch,
      `issue/issueList/${roleId}`,
      null
    );
    console.log("Response", response);
    yield put(roleDeleteResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(roleDeleteResponse(error));
  }
}

function* RoleDeskSaga() {
  yield takeEvery(DELETE_ROLE, deleteRoleById);
}
export default RoleDeskSaga;
