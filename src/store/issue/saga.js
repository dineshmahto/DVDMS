import { call, put, takeEvery } from "redux-saga/effects";
import { Service } from "../../config/commonFetch";
import * as CONSTANTS from "../../common/constant/constants";
import {
  getAddMiscellanousListResponse,
  getIntentDrugResponse,
  getIntentIssueListResponse,
  getIssueCampListResponse,
  getIssueDeskListResponse,
  getIssueToThirdPartyListResponse,
  getMiscellanousStckConsmpListResp,
  getOfflineIssueListResponse,
  getReturnDeskListResponse,
  getSubStoreReturnListResponse,
  getThirdPartyReturnListResponse,
  saveIssueToThirdPartyResponse,
} from "./action";
import {
  GET_ADD_MISCELLANOUS_LIST,
  GET_INTENT_DRUG,
  GET_INTENT_ISSUE_LIST,
  GET_ISSUE_CAMP_LIST,
  GET_ISSUE_DESK_LIST,
  GET_ISSUE_TO_THIRD_PARTY_LIST,
  GET_MISCELLANOUS_STCK_CONSMP_LIST,
  GET_OFFLINE_ISSUE_LIST,
  GET_RETURN_DESK_LIST,
  GET_SUB_STORE_RETURN_LIST,
  GET_THIRD_PARTY_RETURN,
  SAVE_ISSUE_TO_THIRD_PARTY,
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
      CONSTANTS.GET_RETURN_DESK_LIST,
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

function* getThirdPartyReturnList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_THIRD_PARTY_RETURN_LIST,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getThirdPartyReturnListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getThirdPartyReturnListResponse(error));
  }
}

function* getSubStoreReturnList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_SUB_STORE_RETURN_LIST,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getSubStoreReturnListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getSubStoreReturnListResponse(error));
  }
}

function* getMiscellanousConsmpList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_MISCELLANOUS_CONSMP_LIST,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getMiscellanousStckConsmpListResp(response));
  } catch (error) {
    console.log("Error", error);
    put(getMiscellanousStckConsmpListResp(error));
  }
}

function* getAddMiscellanousList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_ADD_MISCELLANOUS_LIST,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getAddMiscellanousListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getAddMiscellanousListResponse(error));
  }
}

function* saveIssueToThirdPartyDetails({ payload: saveThirdPartyDetails }) {
  console.log("saveThirdPartyDetails", saveThirdPartyDetails);
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.SAVE_ISSUE_TO_THIRD_PARTY,
      saveThirdPartyDetails
    );
    console.log("Response", response);
    yield put(saveIssueToThirdPartyResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(saveIssueToThirdPartyResponse(error));
  }
}

function* getIntentDrug({ payload: intentNo }) {
  console.log("intentNo", intentNo);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_INTENT_DRUG_BY_INTENTNO,
      {
        params: intentNo,
      }
    );
    console.log("Response", response);
    yield put(getIntentDrugResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getIntentDrugResponse(error));
  }
}
function* IssueReturnSaga() {
  yield takeEvery(GET_ISSUE_DESK_LIST, getIssueDeskList);
  yield takeEvery(GET_RETURN_DESK_LIST, getReturnDeskList);
  yield takeEvery(GET_ISSUE_TO_THIRD_PARTY_LIST, getIssueToThirdPartyList);
  yield takeEvery(GET_INTENT_ISSUE_LIST, getIntentIssueList);
  yield takeEvery(GET_ISSUE_CAMP_LIST, getIssueCampList);
  yield takeEvery(GET_OFFLINE_ISSUE_LIST, getOfflineIssueList);
  yield takeEvery(GET_THIRD_PARTY_RETURN, getThirdPartyReturnList);
  yield takeEvery(GET_SUB_STORE_RETURN_LIST, getSubStoreReturnList);
  yield takeEvery(GET_MISCELLANOUS_STCK_CONSMP_LIST, getMiscellanousConsmpList);
  yield takeEvery(GET_ADD_MISCELLANOUS_LIST, getAddMiscellanousList);
  yield takeEvery(GET_INTENT_DRUG, getIntentDrug);

  // POST
  yield takeEvery(SAVE_ISSUE_TO_THIRD_PARTY, saveIssueToThirdPartyDetails);
}
export default IssueReturnSaga;
