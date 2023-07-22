import { call, put, take, takeEvery } from "redux-saga/effects";
import { Service } from "../../config/commonFetch";
import * as CONSTANTS from "../../common/constant/constants";
import {
  GET_MANUFACTURING_DESK_LIST,
  GET_APPROVAL_DESK_LIST,
  GET_APPROVAL_INTENT_APPROVAL_LIST,
  GET_PURCHASE_ORDER_LIST_FOR_APPROVAL,
  GET_TRANSFER_APPROVAL_LIST,
  GET_TRANSFER_APPROVAL_LIST_HQ,
  GET_CENTRAL_PURCHASE_LIST,
  CREATE_MANUFACTURING,
  CREATE_MANUFACTURING_RESPONSE,
  EDIT_MANUFACTURING,
  EDIT_MANUFACTURING_RESPONSE,
  GET_ANNUAL_DEMAND_BY_NOTIFICATION_ID,
  APPROVE_ANNUAL_DEMAND,
  GET_NEW_RATE_CONTRACT_LIST,
  ADD_NEW_CONTRACT_RATE,
  RENEW_RATE_CONTRACT,
  INACTIVE_RATE_CONTRACT,
  POST_RENEW_RATE_CONTRACT,
  GET_FREEZE_NOTI_DETAILS,
  CREATE_PO,
  PROCESS_PO,
  GET_PROCESS_ORDER_PROCESS_INFO,
  GET_LOCAL_PO_INFO,
  CREATE_LOCAL_PO,
  CANCEL_PO,
} from "./actionTypes";
import {
  getManufactureDeskListResponse,
  getApprovalDeskListResponse,
  getIntentforApprovalListResponse,
  getPurchaseOrderListResponse,
  getTransferListForApprovalHqResponse,
  getTransferListForApprovalResponse,
  getCentralpurchaseListResponse,
  createManufacturing,
  createManufacturingResponse,
  updateManufacturingResponse,
  getAnnualDemandByNotifIdResp,
  approveAnnualDemandResponse,
  getNewRateContractListResp,
  addNewContractRateResponse,
  renewRateContractResponse,
  inactiveRateContractResponse,
  postRenewRateContractResponse,
  getFreezeNotiDetailsResponse,
  createPoResponse,
  processPOResponse,
  getProcessOrderInfoResponse,
  processLocalPOResponse,
  getLocalPoInfoResponse,
  createLocalPoResponse,
  cancelPoResponse,
} from "./action";

function* getManufacturingDeskList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_MANUFACTURING_LIST,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getManufactureDeskListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getManufactureDeskListResponse(error));
  }
}

function* getApporvalDeskList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.APPROVAL_DESK_LIST,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getApprovalDeskListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getApprovalDeskListResponse(error));
  }
}

function* getPurchaseOrderListForApproval({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.APPROVAL_PURCHASE_ORDER_LIST,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getPurchaseOrderListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getPurchaseOrderListResponse(error));
  }
}

function* getAllIndentForApprovalList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.APPROVAL_INTENT_APPROVAL_LIST,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getIntentforApprovalListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getIntentforApprovalListResponse(error));
  }
}

function* getTransferListForApproval({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.TRANSFER_APPROVAL_LIST,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getTransferListForApprovalResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getTransferListForApprovalResponse(error));
  }
}

function* getTransferListHqForApproval({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.TRANSFER_APPROVAL_LIST_HQ,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getTransferListForApprovalHqResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getTransferListForApprovalHqResponse(error));
  }
}

function* getCentralPurchaseList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_CENTRAL_PURCHASE,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getCentralpurchaseListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getCentralpurchaseListResponse(error));
  }
}

function* createManufacture({ payload: manufacturingDetails }) {
  console.log("programDetails", manufacturingDetails);
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.CREATE_DRUG_MANUFACTURE,
      manufacturingDetails
    );
    console.log("Response", response);
    yield put(createManufacturingResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(createManufacturingResponse(error));
  }
}
function* updateManufacture({ payload: manufactureDetails }) {
  console.log("programDetails", manufactureDetails);
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.UPDATE_DRUG_MANUFACTURE,
      manufactureDetails
    );
    console.log("Response", response);
    yield put(updateManufacturingResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(updateManufacturingResponse(error));
  }
}

function* getAnnualDemandNotiById({ payload: notificationId }) {
  console.log("notificationId", notificationId);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_ANNUAL_DEMAND_DETAIL_BY_ID,
      {
        params: notificationId,
      }
    );
    console.log("Response", response);
    yield put(getAnnualDemandByNotifIdResp(response));
  } catch (error) {
    console.log("Error", error);
    put(getAnnualDemandByNotifIdResp(error));
  }
}

function* postAnnualDemandApproval({ payload: approvalDetails }) {
  console.log("approvalDetails", approvalDetails);
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.POST_ANNUAL_DEMAND_APPROVAL,
      approvalDetails
    );
    console.log("Response", response);
    yield put(approveAnnualDemandResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(approveAnnualDemandResponse(error));
  }
}

function* getNewRateContractList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_RATE_CONTRACT_INFO,
      null
    );
    console.log("Response", response);
    yield put(getNewRateContractListResp(response));
  } catch (error) {
    console.log("Error", error);
    put(getNewRateContractListResp(error));
  }
}

function* addNewContractRate({ payload: addDetails }) {
  console.log("addDetails", addDetails);
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.CREATE_RATE_CONTRACT,
      addDetails
    );
    console.log("Response", response);
    yield put(addNewContractRateResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(addNewContractRateResponse(error));
  }
}

function* renewRateContract({ payload: id }) {
  console.log("id", id);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_RATE_CONTRACT_INFO_BY_ID,
      {
        params: id,
      }
    );
    console.log("Response", response);
    yield put(renewRateContractResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(renewRateContractResponse(error));
  }
}

function* inactiveRateContract({ payload: id }) {
  console.log("id", id);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_RATE_CONTRACT_INACTIVE,
      {
        params: id,
      }
    );
    console.log("Response", response);
    yield put(inactiveRateContractResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(inactiveRateContractResponse(error));
  }
}

function* postRenewRateContract({ payload: id }) {
  console.log("id", id);
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.RENEW_RATE_CONTRACT,
      id
    );
    console.log("Response", response);
    yield put(postRenewRateContractResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(postRenewRateContractResponse(error));
  }
}

function* getFreezeNotiDetails({ payload: id }) {
  console.log("id", id);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_FREEZE_NOTIFICATION_DETAILS,
      { params: id }
    );
    console.log("Response", response);
    yield put(getFreezeNotiDetailsResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getFreezeNotiDetailsResponse(error));
  }
}

function* processPO({ payload: id }) {
  console.log("id", id);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_FREEZE_NOTIFICATION_DETAILS,
      { params: id }
    );
    console.log("Response", response);
    yield put(processPOResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(processPOResponse(error));
  }
}

function* getLocalPoInfo() {
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_LOCAL_PURCHASE_ORDER_INFO,
      null
    );
    console.log("Response", response);
    yield put(getLocalPoInfoResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getLocalPoInfoResponse(error));
  }
}
function* createPo({ payload: poDetails }) {
  console.log("poDetails", poDetails);
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.CREATE_PO,
      poDetails
    );
    console.log("Response", response);
    yield put(createPoResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(createPoResponse(error));
  }
}

function* getProcessOrderInfo({ payload: processDetail }) {
  console.log("processDetail", processDetail);
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.GET_PURCHASE_ORDER_PROCESS_ORDER_INFO,
      processDetail
    );
    console.log("Response", response);
    yield put(getProcessOrderInfoResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getProcessOrderInfoResponse(error));
  }
}

function* createLocalPo({ payload: details }) {
  console.log("poDetails", details);
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.CREATE_LOCAL_PO,
      details
    );
    console.log("Response", response);
    yield put(createLocalPoResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(createLocalPoResponse(error));
  }
}

function* cancelPo({ payload: poId }) {
  console.log("poId", poId);
  try {
    const response = yield call(Service.commonFetch, CONSTANTS.CANCEL_PO, {
      params: poId,
    });
    console.log("Response", response);
    yield put(cancelPoResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(cancelPoResponse(error));
  }
}
function* OrderManagementSaga() {
  yield takeEvery(GET_MANUFACTURING_DESK_LIST, getManufacturingDeskList);
  yield takeEvery(GET_APPROVAL_DESK_LIST, getApporvalDeskList);
  yield takeEvery(
    GET_PURCHASE_ORDER_LIST_FOR_APPROVAL,
    getPurchaseOrderListForApproval
  );
  yield takeEvery(
    GET_APPROVAL_INTENT_APPROVAL_LIST,
    getAllIndentForApprovalList
  );
  yield takeEvery(GET_TRANSFER_APPROVAL_LIST, getTransferListForApproval);
  yield takeEvery(GET_TRANSFER_APPROVAL_LIST_HQ, getTransferListHqForApproval);
  yield takeEvery(GET_CENTRAL_PURCHASE_LIST, getCentralPurchaseList);
  yield takeEvery(CREATE_MANUFACTURING, createManufacture);
  yield takeEvery(EDIT_MANUFACTURING, updateManufacture);
  yield takeEvery(
    GET_ANNUAL_DEMAND_BY_NOTIFICATION_ID,
    getAnnualDemandNotiById
  );
  yield takeEvery(APPROVE_ANNUAL_DEMAND, postAnnualDemandApproval);
  yield takeEvery(GET_NEW_RATE_CONTRACT_LIST, getNewRateContractList);
  yield takeEvery(ADD_NEW_CONTRACT_RATE, addNewContractRate);
  yield takeEvery(RENEW_RATE_CONTRACT, renewRateContract);
  yield takeEvery(INACTIVE_RATE_CONTRACT, inactiveRateContract);
  yield takeEvery(POST_RENEW_RATE_CONTRACT, postRenewRateContract);
  yield takeEvery(GET_FREEZE_NOTI_DETAILS, getFreezeNotiDetails);
  yield takeEvery(CREATE_PO, createPo);
  yield takeEvery(PROCESS_PO, processPO);
  yield takeEvery(GET_PROCESS_ORDER_PROCESS_INFO, getProcessOrderInfo);
  yield takeEvery(GET_LOCAL_PO_INFO, getLocalPoInfo);
  yield takeEvery(CREATE_LOCAL_PO, createLocalPo);
  yield takeEvery(CANCEL_PO, cancelPo);
}
export default OrderManagementSaga;
