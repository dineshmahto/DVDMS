import { call, put, takeEvery } from "redux-saga/effects";
import { Service } from "../../config/commonFetch";
import * as CONSTANTS from "../../common/constant/constants";
import {
  getIntentIssueListResponse,
  getIssueCampListResponse,
  getIssueDeskListResponse,
  getIssueToThirdPartyListResponse,
  getOfflineIssueListResponse,
  getReturnDeskListResponse,
} from "./action";
import {
  GET_INTENT_ISSUE_LIST,
  GET_ISSUE_CAMP_LIST,
  GET_ISSUE_DESK_LIST,
  GET_ISSUE_TO_THIRD_PARTY_LIST,
  GET_OFFLINE_ISSUE_LIST,
  GET_RETURN_DESK_LIST,
} from "./actionTypes";

function* getIssueDeskList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_ISSUE_DESK_LIST,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getIssueDeskListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getIssueDeskListResponse(error));
  }
}

function* getReturnDeskList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_ISSUE_TO_THIRD_PARTY_LIST,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getReturnDeskListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getReturnDeskListResponse(error));
  }
}

function* getIssueToThirdPartyList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_ISSUE_TO_THIRD_PARTY_LIST,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getIssueToThirdPartyListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getIssueToThirdPartyListResponse(error));
  }
}

function* getIntentIssueList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_INTENT_LIST,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getIntentIssueListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getIntentIssueListResponse(error));
  }
}

function* getIssueCampList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_ISSUE_CAMP_LIST,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getIssueCampListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getIssueCampListResponse(error));
  }
}

function* getOfflineIssueList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_OFFLINE_ISSUE_LIST,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getOfflineIssueListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getOfflineIssueListResponse(error));
  }
}
function* IssueReturnSaga() {
  yield takeEvery(GET_ISSUE_DESK_LIST, getIssueDeskList);
  yield takeEvery(GET_RETURN_DESK_LIST, getReturnDeskList);
  yield takeEvery(GET_ISSUE_TO_THIRD_PARTY_LIST, getIssueToThirdPartyList);
  yield takeEvery(GET_INTENT_ISSUE_LIST, getIntentIssueList);
  yield takeEvery(GET_ISSUE_CAMP_LIST, getIssueCampList);
  yield takeEvery(GET_OFFLINE_ISSUE_LIST, getOfflineIssueList);
}
export default IssueReturnSaga;
