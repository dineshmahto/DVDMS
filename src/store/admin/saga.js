import { call, put, take, takeEvery } from "redux-saga/effects";
import {
  createNewBudgetDeskResponse,
  createNewBudgetInterfaceResponse,
  createNewDrugResponse,
  createProgramResponse,
  createRoleResponse,
  createStoreResponse,
  createUserResponse,
  deleteProgramResponse,
  getBudgetDetalsResponse,
  getBudgetIterfaceListResponse,
  getDrugDeksListResponse,
  getEdlMappingListResponse,
  getFundingSourceListResponse,
  getProgramDeskListResponse,
  getProgrameFundingSourceListResponse,
  getPurchaseOrderListResponse,
  getRateContractDeskListResponse,
  getRoleListResponse,
  getStoreDeskListResponse,
  getSupplierListResponse,
  getUserListResponse,
  postEDLMappingResponse,
  postProgrmFundingResponse,
  roleDeleteResponse,
  updateProgramResponse,
  editFundingSourceResponse,
  getActivityByRoleIdResp,
  userDeleteResponse,
  getFundingSourceByPrgrmNameResponse,
  getDrugListByStoreTypeResponse,
  deleteDrugResponse,
  editDrugResponse,
  updateFundingRecordResponse,
  deleteFundingRecordResp,
  createFundingSourceResponse,
  editStoreRecordResponse,
  deleteStoreRecordResponse,
  editRoleResponse,
  createEdlMappingResponse,
  createEdlMapingResponse,
  createProgramFundingResponse,
} from "./action";
import { Service } from "../../config/commonFetch";

import {
  CREATE_NEW_BUDGET,
  CREATE_NEW_BUDGET_DESK,
  CREATE_NEW_DRUG,
  CREATE_NEW_FUNDING,
  CREATE_PROGRAM,
  CREATE_ROLE,
  CREATE_STORE,
  CREATE_USER,
  DELETE_PROGRAM,
  DELETE_ROLE,
  GET_BUDGET_DETAILS,
  GET_BUDGET_INTERFACE_LIST,
  GET_DRUG_DESK_LIST,
  GET_EDL_MAPPING,
  GET_FUNDING_SOURCE_LIST,
  GET_PROGRAM_DESK_LIST,
  GET_PROGRAM_FUNDING_SOURCE,
  GET_PURCHASE_ORDER_LIST,
  GET_RATE_CONTRACT_DESK_LIST,
  GET_ROLE_LIST,
  GET_STORE_DESK_LIST,
  GET_SUPPLIER_LIST,
  GET_USER_LIST,
  POST_EDL_MAPPING,
  POST_PROGRAM_FUND_MAPPING,
  ROLE_DELETED_SUCCESSFULL,
  UPDATE_PROGRAM,
  EDIT_NEW_FUNDING,
  EDIT_NEW_FUNDING_RESPONSE,
  GET_ACTIVITY_LIST_BY_ROLE_ID,
  DELETE_USER,
  GET_FUNDING_SOURCE_BY_PORGRM_NAME,
  GET_DRUG_LIST_BY_STORE_TYPE,
  DELETE_DRUG,
  EDIT_DRUG,
  UPDATE_FUNDING_RECORD,
  DELETE_FUNDING_RECORD,
  EDIT_STORE_RECORD,
  DELETE_STORE_RECORD,
  EDIT_ROLE,
  CREATE_EDL_MAPPING,
  CREATE_PROGRAM_FUNDING,
} from "./actionTypes";
import * as CONSTANTS from "../../common/constant/constants";

function* deleteRoleById({ payload: roleId }) {
  console.log("RoleId", roleId);
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.DELETE_ROLE,
      roleId
    );
    console.log("Response", response);
    yield put(roleDeleteResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(roleDeleteResponse(error));
  }
}

function* deleteUserById({ payload: userId }) {
  console.log("userId", userId);
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.DELETE_USER,
      userId
    );
    console.log("Response", response);
    yield put(userDeleteResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(userDeleteResponse(error));
  }
}

function* getUserList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.USER_LISTING,
      pageDetails
    );
    console.log("Response", response);
    yield put(getUserListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getUserListResponse(error));
  }
}

function* getRoleList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(Service.commonFetch, CONSTANTS.ROLE_LISTING, {
      params: pageDetails,
    });
    console.log("Response", response);
    yield put(getRoleListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getRoleListResponse(error));
  }
}

function* getProgramDeskList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.PROGRAME_DESK_LISTING,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getProgramDeskListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getProgramDeskListResponse(error));
  }
}

function* getStoreDeskList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.STORE_DESK_LISTING,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getStoreDeskListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getStoreDeskListResponse(error));
  }
}

function* getPurchaseOrderList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.PURCHASE_ORDER_LIST,
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

function* getSupplierList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(Service.commonFetch, CONSTANTS.SUPPLIER_LIST, {
      params: pageDetails,
    });
    console.log("Response", response);
    yield put(getSupplierListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getSupplierListResponse(error));
  }
}

function* getRateContractList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.RATE_CONTRACT_LIST,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getRateContractDeskListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getRateContractDeskListResponse(error));
  }
}

function* getFundingSourceList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.FUNDING_DESK_LIST,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getFundingSourceListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getFundingSourceListResponse(error));
  }
}

function* getBudgetInterfaceList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.BUDGET_INTERFACE_LIST,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getBudgetIterfaceListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getBudgetIterfaceListResponse(error));
  }
}

function* getBudgetDetails({ payload: details }) {
  console.log("details", details);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_BUDGET_DETAILS,
      {
        params: details,
      }
    );
    console.log("Response", response);
    yield put(getBudgetDetalsResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getBudgetDetalsResponse(error));
  }
}

function* getDrugDeskList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.DRUG_DESK_LISTING,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getDrugDeksListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getDrugDeksListResponse(error));
  }
}

function* getEdlMappingList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_EDL_MAPPING_LIST,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getEdlMappingListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getEdlMappingListResponse(error));
  }
}

function* createEdlMapping({ payload: edlDetails }) {
  console.log("edlDetails", edlDetails);
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.CREATE_EDL_MAPPING,
      edlDetails
    );
    console.log("Response", response);
    yield put(createEdlMapingResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(createEdlMapingResponse(error));
  }
}

function* getProgrameFundingSourceList({ payload: pageDetails }) {
  console.log("pageDetails", pageDetails);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_PROGRAME_FUNDING_MAPPING,
      {
        params: pageDetails,
      }
    );
    console.log("Response", response);
    yield put(getProgrameFundingSourceListResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getProgrameFundingSourceListResponse(error));
  }
}

function* getFundingSourceListByProgrmName({ payload: progrmName }) {
  console.log("progrmName", progrmName);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_FUNDING_SRC_BY_PROGRM_NAME,
      {
        params: progrmName,
      }
    );
    console.log("Response", response);
    yield put(getFundingSourceByPrgrmNameResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getFundingSourceByPrgrmNameResponse(error));
  }
}

function* createProgramFunding({ payload: programFundingDetails }) {
  console.log("programFundingDetails", programFundingDetails);
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.CREATE_PROGRAMME_FUNDING,
      programFundingDetails
    );
    console.log("Response", response);
    yield put(createProgramFundingResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(createProgramFundingResponse(error));
  }
}

function* getDrugListByStoreType({ payload: storeType }) {
  console.log("storeType", storeType);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_DRUG_LIST_BY_STORE_TYPE,
      {
        params: storeType,
      }
    );
    console.log("Response", response);
    yield put(getDrugListByStoreTypeResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(getDrugListByStoreTypeResponse(error));
  }
}

// POST
function* createUser({ payload: userDetails }) {
  console.log("userDetails", userDetails);
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.CREATE_USER,
      userDetails
    );
    console.log("Response", response);
    yield put(createUserResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(createUserResponse(error));
  }
}

// POST
function* createDrug({ payload: drugDetails }) {
  console.log("drugDetails", drugDetails);
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.CREATE_DRUG,
      drugDetails
    );
    console.log("Response", response);
    yield put(createNewDrugResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(createNewDrugResponse(error));
  }
}

function* createStore({ payload: storeDetails }) {
  console.log("storeDetails", storeDetails);
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.CREATE_NEW_STORE,
      storeDetails
    );
    console.log("Response", response);
    yield put(createStoreResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(createStoreResponse(error));
  }
}

function* editStoreRecord({ payload: storeDetails }) {
  console.log("storeDetails", storeDetails);
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.EDIT_STORE_RECORD,
      storeDetails
    );
    console.log("Response", response);
    yield put(editStoreRecordResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(editStoreRecordResponse(error));
  }
}

function* deleteStoreRecord({ payload: storeId }) {
  console.log("storeId", storeId);
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.DELETE_STORE_RECORD,
      storeId
    );
    console.log("Response", response);
    yield put(deleteStoreRecordResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(deleteStoreRecordResponse(error));
  }
}
function* createProgram({ payload: programDetails }) {
  console.log("programDetails", programDetails);
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.CREATE_NEW_PROGRAM,
      programDetails
    );
    console.log("Response", response);
    yield put(createProgramResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(createProgramResponse(error));
  }
}

function* updateProgram({ payload: updateProgramDetails }) {
  console.log("updateProgramDetails", updateProgramDetails);
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.UPDATE_PROGRAM,
      updateProgramDetails
    );
    console.log("Response", response);
    yield put(updateProgramResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(updateProgramResponse(error));
  }
}

function* deleteProgram({ payload: deleteId }) {
  console.log("deleteId", deleteId);
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.DELETE_PROGRAM,
      deleteId
    );
    console.log("Response", response);
    yield put(deleteProgramResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(deleteProgramResponse(error));
  }
}

function* createRole({ payload: roleDetails }) {
  console.log("roleDetails", roleDetails);
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.CREATE_NEW_ROLE,
      roleDetails
    );
    console.log("Response", response);
    yield put(createRoleResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(createRoleResponse(error));
  }
}

function* editRole({ payload: roleDetails }) {
  console.log("roleDetails", roleDetails);
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.UPDATE_ROLE,
      roleDetails
    );
    console.log("Response", response);
    yield put(editRoleResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(editRoleResponse(error));
  }
}

function* getActivityListByType({ payload: roleId }) {
  console.log("roleDetails", roleId);
  try {
    const response = yield call(
      Service.commonFetch,
      CONSTANTS.GET_ACTIVITLY_LIST_BY_CODE,
      {
        params: roleId,
      }
    );
    console.log("Response", response);
    yield put(getActivityByRoleIdResp(response));
  } catch (error) {
    console.log("Error", error);
    put(getActivityByRoleIdResp(error));
  }
}

function* postProgramFunding({ payload: prgmFundingDetails }) {
  console.log("prgmFundingDetails", prgmFundingDetails);
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.POST_PROGRAM_FUNDING,
      prgmFundingDetails
    );
    console.log("Response", response);
    yield put(postProgrmFundingResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(postProgrmFundingResponse(error));
  }
}

function* postEDLMapping({ payload: edlMappingDetails }) {
  console.log("edlMappingDetails", edlMappingDetails);
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.POST_EDL_MAPPING,
      edlMappingDetails
    );
    console.log("Response", response);
    yield put(postEDLMappingResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(postEDLMappingResponse(error));
  }
}

function* createNewBudgetInterface({ payload: budgetDetails }) {
  console.log("budgetDetails", budgetDetails);
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.CREATE_NEW_BUDGET,
      budgetDetails
    );
    console.log("Response", response);
    yield put(createNewBudgetInterfaceResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(createNewBudgetInterfaceResponse(error));
  }
}

function* createNewFundingSource({ payload: fundingSrcDetails }) {
  console.log("fundingSrcDetails", fundingSrcDetails);
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.CREATE_NEW_FUNDING,
      fundingSrcDetails
    );
    console.log("Response", response);
    yield put(createFundingSourceResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(createFundingSourceResponse(error));
  }
}

function* updateFundingRcrd({ payload: fundingRecrdDetails }) {
  console.log("fundingRecrdDetails", fundingRecrdDetails);
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.UPDATE_FUNDING_RECORD,
      fundingRecrdDetails
    );
    console.log("Response", response);
    yield put(updateFundingRecordResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(updateFundingRecordResponse(error));
  }
}

function* deleteFundingRcrd({ payload: fundingRecrdDetails }) {
  console.log("fundingRecrdDetails", fundingRecrdDetails);
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.DELETE_FUNDING_RECORD,
      fundingRecrdDetails
    );
    console.log("Response", response);
    yield put(deleteFundingRecordResp(response));
  } catch (error) {
    console.log("Error", error);
    put(deleteFundingRecordResp(error));
  }
}

function* createNewBudgetDesk({ payload: budgetDetails }) {
  console.log("budgetDetails", budgetDetails);
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.CREATE_NEW_BUDGET_DESK,
      budgetDetails
    );
    console.log("Response", response);
    yield put(createNewBudgetDeskResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(createNewBudgetDeskResponse(error));
  }
}

function* editNewFundingSource({ payload: editFundingSrcResp }) {
  console.log("budgetDetails", editFundingSrcResp);
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.UPDATE_FUNDING,
      editFundingSrcResp
    );
    console.log("Response", response);
    yield put(editFundingSourceResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(editFundingSourceResponse(error));
  }
}

function* deleteDrug({ payload: drugId }) {
  console.log("drugId", drugId);
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.DELETE_DRUG,
      drugId
    );
    console.log("Response", response);
    yield put(deleteDrugResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(deleteDrugResponse(error));
  }
}

function* editDrug({ payload: drugDetails }) {
  console.log("drugDetails", drugDetails);
  try {
    const response = yield call(
      Service.commonPost,
      CONSTANTS.EDIT_DRUG,
      drugDetails
    );
    console.log("Response", response);
    yield put(editDrugResponse(response));
  } catch (error) {
    console.log("Error", error);
    put(editDrugResponse(error));
  }
}
function* AdminSaga() {
  yield takeEvery(DELETE_ROLE, deleteRoleById);
  yield takeEvery(DELETE_USER, deleteUserById);
  yield takeEvery(GET_USER_LIST, getUserList);
  yield takeEvery(GET_ROLE_LIST, getRoleList);
  yield takeEvery(GET_PROGRAM_DESK_LIST, getProgramDeskList);
  yield takeEvery(GET_STORE_DESK_LIST, getStoreDeskList);
  yield takeEvery(GET_PURCHASE_ORDER_LIST, getPurchaseOrderList);
  yield takeEvery(GET_SUPPLIER_LIST, getSupplierList);
  yield takeEvery(GET_RATE_CONTRACT_DESK_LIST, getRateContractList);
  yield takeEvery(GET_FUNDING_SOURCE_LIST, getFundingSourceList);
  yield takeEvery(GET_BUDGET_INTERFACE_LIST, getBudgetInterfaceList);
  yield takeEvery(GET_DRUG_DESK_LIST, getDrugDeskList);
  yield takeEvery(GET_EDL_MAPPING, getEdlMappingList);
  yield takeEvery(GET_PROGRAM_FUNDING_SOURCE, getProgrameFundingSourceList);
  yield takeEvery(GET_BUDGET_DETAILS, getBudgetDetails);
  yield takeEvery(GET_ACTIVITY_LIST_BY_ROLE_ID, getActivityListByType);
  yield takeEvery(
    GET_FUNDING_SOURCE_BY_PORGRM_NAME,
    getFundingSourceListByProgrmName
  );
  yield takeEvery(GET_DRUG_LIST_BY_STORE_TYPE, getDrugListByStoreType);
  // POST

  yield takeEvery(CREATE_USER, createUser);
  yield takeEvery(CREATE_NEW_DRUG, createDrug);
  yield takeEvery(CREATE_STORE, createStore);
  yield takeEvery(CREATE_PROGRAM, createProgram);
  yield takeEvery(CREATE_ROLE, createRole);
  yield takeEvery(EDIT_ROLE, editRole);
  yield takeEvery(POST_PROGRAM_FUND_MAPPING, postProgramFunding);
  yield takeEvery(POST_EDL_MAPPING, postEDLMapping);
  yield takeEvery(CREATE_NEW_BUDGET, createNewBudgetInterface);
  yield takeEvery(CREATE_NEW_FUNDING, createNewFundingSource);
  yield takeEvery(EDIT_NEW_FUNDING, editNewFundingSource);
  yield takeEvery(UPDATE_PROGRAM, updateProgram);
  yield takeEvery(DELETE_PROGRAM, deleteProgram);
  yield takeEvery(CREATE_NEW_BUDGET_DESK, createNewBudgetDesk);
  yield takeEvery(DELETE_DRUG, deleteDrug);
  yield takeEvery(EDIT_DRUG, editDrug);
  yield takeEvery(UPDATE_FUNDING_RECORD, updateFundingRcrd);
  yield takeEvery(DELETE_FUNDING_RECORD, deleteFundingRcrd);
  yield takeEvery(EDIT_STORE_RECORD, editStoreRecord);
  yield takeEvery(DELETE_STORE_RECORD, deleteStoreRecord);
  yield takeEvery(CREATE_EDL_MAPPING, createEdlMapping);
  yield takeEvery(CREATE_PROGRAM_FUNDING, createProgramFunding);
}
export default AdminSaga;
