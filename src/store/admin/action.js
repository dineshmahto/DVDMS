import {
  CREATE_NEW_BUDGET,
  CREATE_NEW_BUDGET_DESK,
  CREATE_NEW_BUDGET_DESK_RESPONSE,
  CREATE_NEW_BUDGET_RESPONSE,
  CREATE_NEW_DRUG,
  CREATE_NEW_DRUG_RESPONSE,
  CREATE_NEW_FUNDING,
  CREATE_NEW_FUNDING_RESPONSE,
  CREATE_PORGRAM_RESPONSE,
  CREATE_PROGRAM,
  CREATE_ROLE,
  CREATE_ROLE_RESPONSE,
  CREATE_STORE,
  CREATE_STORE_RESPONSE,
  CREATE_USER,
  CREATE_USER_RESPONSE,
  DELETE_PROGRAM,
  DELETE_PROGRAM_RESPONSE,
  DELETE_ROLE,
  GET_BUDGET_DETAILS,
  GET_BUDGET_DETAILS_RESPONSE,
  GET_BUDGET_INTERFACE_LIST,
  GET_BUDGET_INTERFACE_LIST_RESPONSE,
  GET_DRUG_DESK_LIST,
  GET_DRUG_DESK_LIST_RESPONSE,
  GET_EDL_MAPPING,
  GET_EDL_MAPPING_RESPONSE,
  GET_FUNDING_SOURCE_LIST,
  GET_FUNDING_SOURCE_LIST_RESPONSE,
  GET_PROGRAM_DESK_LIST,
  GET_PROGRAM_DESK_LIST_RESPONSE,
  GET_PROGRAM_FUNDING_SOURCE,
  GET_PROGRAM_FUNDING_SOURCE_RESPONSE,
  GET_PURCHASE_ORDER_LIST,
  GET_PURCHASE_ORDER_LIST_RESPONSE,
  GET_RATE_CONTRACT_DESK_LIST,
  GET_RATE_CONTRACT_DESK_LIST_RESPONSE,
  GET_ROLE_LIST,
  GET_ROLE_LIST_RESPONSE,
  GET_STORE_DESK_LIST,
  GET_STORE_DESK_LIST_RESPONSE,
  GET_SUPPLIER_LIST,
  GET_SUPPLIER_LIST_RESPONSE,
  GET_USER_LIST,
  GET_USER_LIST_RESPONSE,
  POST_EDL_MAPPING,
  POST_EDL_MAPPING_RESPONSE,
  POST_PROGRAM_FUND_MAPPING,
  POST_PROGRAM_FUND_MAPPING_RESPONSE,
  ROLE_DELETED_SUCCESSFULL,
  UPDATE_PROGRAM,
  UPDATE_PROGRAM_RESPONSE,
  EDIT_NEW_FUNDING,
  EDIT_NEW_FUNDING_RESPONSE,
  GET_ACTIVITY_LIST_BY_ROLE_ID,
  GET_ACTIVITY_LIST_BY_ROLE_ID_RESPONSE,
  DELETE_USER,
  DELETE_USER_RESPONSE,
  GET_DRUG_LIST_BY_STORE_TYPE,
  GET_DRUG_LIST_BY_STORE_TYPE_RESPONSE,
  DELETE_DRUG,
  DELETE_DRUG_RESPONSE,
  EDIT_DRUG,
  EDIT_DRUG_RESPONSE,
  UPDATE_FUNDING_RECORD,
  UPDATE_FUNDING_RECORD_RSPONSE,
  DELETE_FUNDING_RECORD,
  DELETE_FUNDING_RECORD_RESPONSE,
  EDIT_STORE_RECORD,
  EDIT_STORE_RECORD_RESPONSE,
  DELETE_STORE_RECORD,
  DELETE_STORE_RECORD_RESPONSE,
  EDIT_ROLE,
  EDIT_ROLE_RESPONSE,
  CREATE_EDL_MAPPING,
  CREATE_EDL_MAPPING_RESPONSE,
  GET_FUNDING_SOURCE_BY_PORGRM_NAME,
  GET_FUNDING_SOURCE_BY_PORGRM_NAME_RESPONSE,
  CREATE_PROGRAM_FUNDING,
  CREATE_PROGRAM_FUNDING_RESPONSE,
} from "./actionTypes";
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

export const deleteUser = (userId) => {
  return {
    type: DELETE_USER,
    payload: userId,
  };
};
export const userDeleteResponse = (userDelteResp) => {
  return {
    type: DELETE_USER_RESPONSE,
    payload: userDelteResp,
  };
};

export const getUserList = (pageDetails) => {
  return {
    type: GET_USER_LIST,
    payload: pageDetails,
  };
};

export const getUserListResponse = (userListResponse) => {
  return {
    type: GET_USER_LIST_RESPONSE,
    payload: userListResponse,
  };
};

export const getDrugDeksList = (pageDetails) => {
  return {
    type: GET_DRUG_DESK_LIST,
    payload: pageDetails,
  };
};
export const getDrugDeksListResponse = (drugDeskListResponse) => {
  return {
    type: GET_DRUG_DESK_LIST_RESPONSE,
    payload: drugDeskListResponse,
  };
};
export const getRoleList = (pageDetails) => {
  return {
    type: GET_ROLE_LIST,
    payload: pageDetails,
  };
};

export const getRoleListResponse = (roleListResponse) => {
  return {
    type: GET_ROLE_LIST_RESPONSE,
    payload: roleListResponse,
  };
};

export const getProgramDeskList = (pageDetails) => {
  return {
    type: GET_PROGRAM_DESK_LIST,
    payload: pageDetails,
  };
};
export const getProgramDeskListResponse = (programeDeskListResponse) => {
  return {
    type: GET_PROGRAM_DESK_LIST_RESPONSE,
    payload: programeDeskListResponse,
  };
};

export const getStoreDeskList = (pageDetails) => {
  return {
    type: GET_STORE_DESK_LIST,
    payload: pageDetails,
  };
};

export const getStoreDeskListResponse = (storeDeskListResponse) => {
  return {
    type: GET_STORE_DESK_LIST_RESPONSE,
    payload: storeDeskListResponse,
  };
};

export const getPurchaseOrderList = (pageDetails) => {
  return {
    type: GET_PURCHASE_ORDER_LIST,
    payload: pageDetails,
  };
};

export const getPurchaseOrderListResponse = (purchaseOrderListResponse) => {
  return {
    type: GET_PURCHASE_ORDER_LIST_RESPONSE,
    payload: purchaseOrderListResponse,
  };
};
export const getSupplierList = (pageDetails) => {
  return {
    type: GET_SUPPLIER_LIST,
    payload: pageDetails,
  };
};
export const getSupplierListResponse = (supplierListResponse) => {
  return {
    type: GET_SUPPLIER_LIST_RESPONSE,
    payload: supplierListResponse,
  };
};

export const getRateContractDeskList = (pageDetails) => {
  return {
    type: GET_RATE_CONTRACT_DESK_LIST,
    payload: pageDetails,
  };
};
export const getRateContractDeskListResponse = (rateContractListResponse) => {
  return {
    type: GET_RATE_CONTRACT_DESK_LIST_RESPONSE,
    payload: rateContractListResponse,
  };
};
export const getFundingSourceList = (pageDetails) => {
  return {
    type: GET_FUNDING_SOURCE_LIST,
    payload: pageDetails,
  };
};
export const getFundingSourceListResponse = (fundingSourceListResponse) => {
  return {
    type: GET_FUNDING_SOURCE_LIST_RESPONSE,
    payload: fundingSourceListResponse,
  };
};

export const getBudgetIterfaceList = (pageDetails) => {
  return {
    type: GET_BUDGET_INTERFACE_LIST,
    payload: pageDetails,
  };
};

export const getBudgetIterfaceListResponse = (budgetInterfaceListResponse) => {
  return {
    type: GET_BUDGET_INTERFACE_LIST_RESPONSE,
    payload: budgetInterfaceListResponse,
  };
};

export const getBudgetDetals = (details) => {
  return {
    type: GET_BUDGET_DETAILS,
    payload: details,
  };
};
export const getBudgetDetalsResponse = (budgetDetailsResp) => {
  return {
    type: GET_BUDGET_DETAILS_RESPONSE,
    payload: budgetDetailsResp,
  };
};

export const createNewBudgetDesk = (budgetDetails) => {
  return {
    type: CREATE_NEW_BUDGET_DESK,
    payload: budgetDetails,
  };
};
export const createNewBudgetDeskResponse = (createBudgetDeskResp) => {
  return {
    type: CREATE_NEW_BUDGET_DESK_RESPONSE,
    payload: createBudgetDeskResp,
  };
};

export const getEdlMappingList = (pageDetails) => {
  return {
    type: GET_EDL_MAPPING,
    payload: pageDetails,
  };
};
export const getEdlMappingListResponse = (edlMappingListResponse) => {
  return {
    type: GET_EDL_MAPPING_RESPONSE,
    payload: edlMappingListResponse,
  };
};

export const createEdlMapping = (edlDetails) => {
  return {
    type: CREATE_EDL_MAPPING,
    payload: edlDetails,
  };
};
export const createEdlMapingResponse = (createEdlMapResponse) => {
  return {
    type: CREATE_EDL_MAPPING_RESPONSE,
    payload: createEdlMapResponse,
  };
};

export const getProgrameFundingSourceList = (pageDetails) => {
  return {
    type: GET_PROGRAM_FUNDING_SOURCE,
    payload: pageDetails,
  };
};
export const getProgrameFundingSourceListResponse = (
  programFundingSourceListResponse
) => {
  return {
    type: GET_PROGRAM_FUNDING_SOURCE_RESPONSE,
    payload: programFundingSourceListResponse,
  };
};

export const getFundingSourceByPrgrmName = (progrmName) => {
  return {
    type: GET_FUNDING_SOURCE_BY_PORGRM_NAME,
    payload: progrmName,
  };
};
export const getFundingSourceByPrgrmNameResponse = (
  fundingSourceListByPrgrmResp
) => {
  return {
    type: GET_FUNDING_SOURCE_BY_PORGRM_NAME_RESPONSE,
    payload: fundingSourceListByPrgrmResp,
  };
};

export const createProgramFunding = (programFundingDetails) => {
  return {
    type: CREATE_PROGRAM_FUNDING,
    payload: programFundingDetails,
  };
};
export const createProgramFundingResponse = (crateProgramFundingResp) => {
  return {
    type: CREATE_PROGRAM_FUNDING_RESPONSE,
    payload: crateProgramFundingResp,
  };
};

export const getDrugListByStoreType = (storeType) => {
  return {
    type: GET_DRUG_LIST_BY_STORE_TYPE,
    payload: storeType,
  };
};
export const getDrugListByStoreTypeResponse = (drugListByStoreTypeResp) => {
  return {
    type: GET_DRUG_LIST_BY_STORE_TYPE_RESPONSE,
    payload: drugListByStoreTypeResp,
  };
};

// POST

export const createUser = (userDetails) => {
  return {
    type: CREATE_USER,
    payload: userDetails,
  };
};

export const createUserResponse = (createUsrResp) => {
  return {
    type: CREATE_USER_RESPONSE,
    payload: createUsrResp,
  };
};

export const createNewDrug = (drugDetails) => {
  return {
    type: CREATE_NEW_DRUG,
    payload: drugDetails,
  };
};

export const createNewDrugResponse = (createDrugResp) => {
  return {
    type: CREATE_NEW_DRUG_RESPONSE,
    payload: createDrugResp,
  };
};

export const createStore = (storeDetails) => {
  return {
    type: CREATE_STORE,
    payload: storeDetails,
  };
};

export const createStoreResponse = (createStoreResp) => {
  return {
    type: CREATE_STORE_RESPONSE,
    payload: createStoreResp,
  };
};

export const editStoreRecord = (storeDetails) => {
  return {
    type: EDIT_STORE_RECORD,
    payload: storeDetails,
  };
};

export const editStoreRecordResponse = (createStoreRecordResp) => {
  return {
    type: EDIT_STORE_RECORD_RESPONSE,
    payload: createStoreRecordResp,
  };
};

export const deleteStoreRecord = (storeId) => {
  return {
    type: DELETE_STORE_RECORD,
    payload: storeId,
  };
};

export const deleteStoreRecordResponse = (deleteStoreRecordResp) => {
  return {
    type: DELETE_STORE_RECORD_RESPONSE,
    payload: deleteStoreRecordResp,
  };
};

export const createProgram = (programDetails) => {
  return {
    type: CREATE_PROGRAM,
    payload: programDetails,
  };
};
export const createProgramResponse = (createPrgmResp) => {
  return {
    type: CREATE_PORGRAM_RESPONSE,
    payload: createPrgmResp,
  };
};

export const updateProgram = (updateProgramDetails) => {
  return {
    type: UPDATE_PROGRAM,
    payload: updateProgramDetails,
  };
};

export const updateProgramResponse = (updateProgramResponse) => {
  return {
    type: UPDATE_PROGRAM_RESPONSE,
    payload: updateProgramResponse,
  };
};

export const deleteProgrm = (deleteId) => {
  return {
    type: DELETE_PROGRAM,
    payload: deleteId,
  };
};

export const deleteProgramResponse = (deleteProgrmResponse) => {
  return {
    type: DELETE_PROGRAM_RESPONSE,
    payload: deleteProgrmResponse,
  };
};
export const createRole = (roleDetails) => {
  return {
    type: CREATE_ROLE,
    payload: roleDetails,
  };
};

export const createRoleResponse = (createRoleRsp) => {
  return {
    type: CREATE_ROLE_RESPONSE,
    payload: createRoleRsp,
  };
};

export const editRole = (roleDetails) => {
  return {
    type: EDIT_ROLE,
    payload: roleDetails,
  };
};

export const editRoleResponse = (editRoleRsp) => {
  return {
    type: EDIT_ROLE_RESPONSE,
    payload: editRoleRsp,
  };
};

export const getActivityByRoleId = (roleId) => {
  return {
    type: GET_ACTIVITY_LIST_BY_ROLE_ID,
    payload: roleId,
  };
};
export const getActivityByRoleIdResp = (activityListByRoleIdResp) => {
  return {
    type: GET_ACTIVITY_LIST_BY_ROLE_ID_RESPONSE,
    payload: activityListByRoleIdResp,
  };
};

export const postProgrmFunding = (prgmFundingDetails) => {
  return {
    type: POST_PROGRAM_FUND_MAPPING,
    payload: prgmFundingDetails,
  };
};

export const postProgrmFundingResponse = (postPrgmFundingResp) => {
  return {
    type: POST_PROGRAM_FUND_MAPPING_RESPONSE,
    payload: postPrgmFundingResp,
  };
};

export const postEDLMapping = (edlMappingDetails) => {
  return {
    type: POST_EDL_MAPPING,
    payload: edlMappingDetails,
  };
};

export const postEDLMappingResponse = (postEDLMappingResp) => {
  return {
    type: POST_EDL_MAPPING_RESPONSE,
    payload: postEDLMappingResp,
  };
};
export const createNewBudgetInterface = (budgetDetails) => {
  return {
    type: CREATE_NEW_BUDGET,
    payload: budgetDetails,
  };
};
export const createNewBudgetInterfaceResponse = (createBudgetResp) => {
  return {
    type: CREATE_NEW_BUDGET_RESPONSE,
    payload: createBudgetResp,
  };
};

export const createFundingSource = (fundingSrcDetails) => {
  return {
    type: CREATE_NEW_FUNDING,
    payload: fundingSrcDetails,
  };
};
export const createFundingSourceResponse = (createFundingSrcResp) => {
  return {
    type: CREATE_NEW_FUNDING_RESPONSE,
    payload: createFundingSrcResp,
  };
};

export const editFundingSource = (fundingSrDetails) => {
  return {
    type: EDIT_NEW_FUNDING,
    payload: fundingSrDetails,
  };
};
export const editFundingSourceResponse = (editFundingSrcResp) => {
  return {
    type: EDIT_NEW_FUNDING_RESPONSE,
    payload: editFundingSrcResp,
  };
};

export const deleteDrug = (drugId) => {
  return {
    type: DELETE_DRUG,
    payload: drugId,
  };
};
export const deleteDrugResponse = (deleteDrugResp) => {
  return {
    type: DELETE_DRUG_RESPONSE,
    payload: deleteDrugResp,
  };
};

export const editDrug = (drugDetails) => {
  return {
    type: EDIT_DRUG,
    payload: drugDetails,
  };
};
export const editDrugResponse = (editDrugResp) => {
  return {
    type: EDIT_DRUG_RESPONSE,
    payload: editDrugResp,
  };
};

export const updateFundingRecord = (fundingRecrdDetails) => {
  return {
    type: UPDATE_FUNDING_RECORD,
    payload: fundingRecrdDetails,
  };
};

export const updateFundingRecordResponse = (updatefundingRecrdResp) => {
  return {
    type: UPDATE_FUNDING_RECORD_RSPONSE,
    payload: updatefundingRecrdResp,
  };
};

export const deleteFundingRecord = (fundingRecrdDetails) => {
  return {
    type: DELETE_FUNDING_RECORD,
    payload: fundingRecrdDetails,
  };
};

export const deleteFundingRecordResp = (deletefundingRecrdResp) => {
  return {
    type: DELETE_FUNDING_RECORD_RESPONSE,
    payload: deletefundingRecrdResp,
  };
};
