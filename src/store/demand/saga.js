import { call, put, takeEvery } from "redux-saga/effects";
import { Service } from "../../config/commonFetch";
import * as CONSTANTS from "../../common/constant/constants";
import {
  CANCEL_NOTIFICATION,
  GET_ALL_OPEN_NOTIFICATION_LIST,
  GET_DRUG_BY_PROGRAMME_ID,
  GET_NOTIFICATION_LIST,
  SAVE_DEMAND_NOTIFICATION,
  UPDATE_NOTIFICATION,
} from "./actionTypes";
import {
  cancelNotificationResponse,
  getAllOpenNotificationResponse,
  getDrugListByProgramIdResponse,
  getNotificationListResponse,
  saveDemandNotificationResponse,
  updateNotificationResponse,
} from "./action";

function* getNotificationList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.NOTIFICATION_LIST,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getNotificationListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getNotificationListResponse(error));
  }
}

function* getAllOpenNotificationList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.OPEN_NOTIFICATION_DESK,
      null
    );
    console.log("Response", response);
    yield put(getAllOpenNotificationResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getAllOpenNotificationResponse(error));
  }
}

function* getDrugListByProgramId({ payload: programId }) {
  console.log("programId", programId);
  try {
    const response = yield call(
      Service.commonFetch,
      `calls/getDrugListByProgramIDList`,
      {
        params: programId,
      }
    );
    console.log("Response", response);
    yield put(getDrugListByProgramIdResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getDrugListByProgramIdResponse(error));
  }
}
function* saveDemandNotification({ payload: demandDetails }) {
  console.log("programId", demandDetails);
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.SAVE_DEMAND_NOTIFICATION,
      demandDetails
    );
    console.log("Response", response);
    yield put(saveDemandNotificationResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(saveDemandNotificationResponse(error));
  }
}

function* cancelNotification({ payload: notificationId }) {
  console.log("notificationId", notificationId);
  try {
    const response = yield call(
      Service.commonDelete,
      `Notification/notificationDelete/${notificationId}`,
      null
    );
    console.log("Response", response);
    yield put(cancelNotificationResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(cancelNotificationResponse(error));
  }
}

function* updateNotification({ payload: updateDetails }) {
  console.log("updateDetails", updateDetails);
  try {
    const response = yield call(
      Service.commonPut,
      `Notification/notificationUpdate/${updateDetails?.id}`,
      updateDetails
    );
    console.log("Response", response);
    yield put(updateNotificationResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(updateNotificationResponse(error));
  }
}

function* DemandSaga() {
  yield takeEvery(GET_NOTIFICATION_LIST, getNotificationList);
  yield takeEvery(GET_ALL_OPEN_NOTIFICATION_LIST, getAllOpenNotificationList);
  yield takeEvery(GET_DRUG_BY_PROGRAMME_ID, getDrugListByProgramId);
  yield takeEvery(SAVE_DEMAND_NOTIFICATION, saveDemandNotification);
  yield takeEvery(CANCEL_NOTIFICATION, cancelNotification);
  yield takeEvery(UPDATE_NOTIFICATION, updateNotification);
}
export default DemandSaga;
