import { call, put, takeEvery } from "redux-saga/effects";
import { Service } from "../../config/commonFetch";
import * as CONSTANTS from "../../common/constant/constants";
import {
  CANCEL_NOTIFICATION,
  GET_ALL_OPEN_NOTIFICATION_LIST,
  GET_ANNUAL_DEMAND_NOTIFICATION,
  GET_COMPILE_DEMAND,
  GET_DRUG_BY_PROGRAMME_ID,
  GET_NOTIFICATION_LIST,
  SAVE_COMPILE_DEMAND,
  SAVE_DEMAND_NOTIFICATION,
  SAVE_GENERATE_ANNUAL_DEMAND,
  UPDATE_NOTIFICATION,
} from "./actionTypes";
import {
  cancelNotificationResponse,
  getAllOpenNotificationResponse,
  getAnnualDemandNotificationResp,
  getCompileDemand,
  getCompileDemandResp,
  getDrugListByProgramIdResponse,
  getNotificationListResponse,
  saveCompileDemandResp,
  saveDemandNotificationResponse,
  saveGenerateAnnualDemandResp,
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

function* getAnnualDemandNotificationList({ payload: notificationId }) {
  console.log("notificationId", notificationId);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_ANNUAL_DEMAND_LIST,
      {
        params: notificationId,
      }
    );
    console.log("Response", response);
    yield put(getAnnualDemandNotificationResp(response));
  } catch (error) {
    console.log("Error", error);
    put(getAnnualDemandNotificationResp(error));
  }
}

function* getCompileDemandList({ payload: notificationId }) {
  console.log("notificationId", notificationId);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_COMPILE_DEMAND_LIST,
      {
        params: notificationId,
      }
    );
    console.log("Response", response);
    yield put(getCompileDemandResp(response));
  } catch (error) {
    console.log("Error", error);
    put(getCompileDemandResp(error));
  }
}

function* saveGenerateAnnualDmd({ payload: saveAnnualDemdDetails }) {
  console.log("saveAnnualDemdDetails", saveAnnualDemdDetails);
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.SAVE_GENERATE_ANNUAL_DEMAND,
      saveAnnualDemdDetails
    );
    console.log("Response", response);
    yield put(saveGenerateAnnualDemandResp(response));
  } catch (error) {
    console.log("Error", error);
    put(saveGenerateAnnualDemandResp(error));
  }
}

function* saveCompileDemand({ payload: saveCompileDmdDetails }) {
  console.log("saveCompileDmdDetails", saveCompileDmdDetails);
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.SAVE_GENERATE_ANNUAL_DEMAND,
      saveCompileDmdDetails
    );
    console.log("Response", response);
    yield put(saveCompileDemandResp(response));
  } catch (error) {
    console.log("Error", error);
    put(saveCompileDemandResp(error));
  }
}

function* DemandSaga() {
  yield takeEvery(GET_NOTIFICATION_LIST, getNotificationList);
  yield takeEvery(GET_ALL_OPEN_NOTIFICATION_LIST, getAllOpenNotificationList);
  yield takeEvery(GET_DRUG_BY_PROGRAMME_ID, getDrugListByProgramId);
  yield takeEvery(SAVE_DEMAND_NOTIFICATION, saveDemandNotification);
  yield takeEvery(CANCEL_NOTIFICATION, cancelNotification);
  yield takeEvery(UPDATE_NOTIFICATION, updateNotification);
  yield takeEvery(
    GET_ANNUAL_DEMAND_NOTIFICATION,
    getAnnualDemandNotificationList
  );
  yield takeEvery(GET_COMPILE_DEMAND, getCompileDemandList);
  yield takeEvery(SAVE_GENERATE_ANNUAL_DEMAND, saveGenerateAnnualDmd);
  yield takeEvery(SAVE_COMPILE_DEMAND, saveCompileDemand);
}
export default DemandSaga;
