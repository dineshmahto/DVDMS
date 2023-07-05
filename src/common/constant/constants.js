//Login
export const LOGIN = "auth/authenticate";
//Logout
export const LOGOUT = "auth/logout";
//Dashboard
export const GET_DASHBOARD_CARD_DATA = "dashboard/details";
// Demand
export const GET_NOTIFICATION_LIST = "pagination/getNotificationList";

// Admin Module
// Role Desk
export const ROLE_LISTING = "pagination/getRoleList";
//User Desk
export const USER_LISTING = "pagination/getUserList";

export const CREATE_USER = "post/createUser";
export const DELETE_USER = "post/deleteUser";
export const CREATE_DRUG = "post/createNewDrug";

export const CREATE_NEW_BUDGET = "post/createBudgetDesk";
export const CREATE_NEW_FUNDING = "post/createFundingRecord";
export const UPDATE_FUNDING_RECORD = "post/updateFundingRecord";
export const DELETE_FUNDING_RECORD = "post/deleteFundingRecord";

export const POST_EDL_MAPPING = "post/createEDLMapping";
export const POST_PROGRAM_FUNDING = "post/createProgramFunding";

export const CREATE_NEW_PROGRAM = "post/createProgram";
export const UPDATE_PROGRAM = "post/updateProgram";
export const DELETE_PROGRAM = "post/deleteProgram";
export const CREATE_NEW_ROLE = "post/createRole";
export const UPDATE_ROLE = "post/updateRole";

export const DELETE_ROLE = "post/deleteRole";
export const CREATE_NEW_STORE = "post/createStore";
export const EDIT_STORE_RECORD = "post/editStoreRecord";
export const DELETE_STORE_RECORD = "post/deleteStoreRecord";

export const GET_ACTIVITLY_LIST_BY_CODE = "calls/getActivityListByType";

//Drug Desk
export const DRUG_DESK_LISTING = "pagination/getDrugList";
export const DELETE_DRUG = "post/deleteDrugRecord";
export const EDIT_DRUG = "post/editDrugRecord";
// Progame Desk
export const PROGRAME_DESK_LISTING = "pagination/getProgrammeList";
// Store Desk
export const FUNDING_DESK_LIST = "pagination/getAllFundingSourceList";
export const BUDGET_INTERFACE_LIST = "pagination/getAllBudgetList";

export const GET_BUDGET_DETAILS = "calls/getDetailBudgetList";

export const CREATE_NEW_BUDGET_DESK = "post/createBudgetDesk";
export const GET_EDL_MAPPING_LIST = "calls/getEdlMapping";

export const GET_PROGRAME_FUNDING_MAPPING = "calls/getProgrammeFundingMapping";

// EDL MAPPING
export const GET_DRUG_LIST_BY_STORE_TYPE = "calls/getDrugListByStoreTypeId";
export const CREATE_EDL_MAPPING = "post/createEDLMapping";
// FUNDING SOURCE
export const GET_FUNDING_SRC_BY_PROGRM_NAME =
  "calls/getFundingSourceByProgramId";

export const CREATE_PROGRAMME_FUNDING = "post/createProgramFunding";
// End of Admin Module Route

// Order Management Module
// Purchase Order List Route
export const PURCHASE_ORDER_LIST = "pagination/GetPurchaseOrderList";
export const SUPPLIER_LIST = "pagination/getSupplierList";
export const RATE_CONTRACT_LIST = "pagination/getRateContactList";

//Stock Module
export const STOCK_DESK_LISTING = "pagination/getAllStockList";
export const ADD_STOCK_ENTRY = "post/postStockEntry";
export const GET_STOCK_ENTRY_DESK = "calls/getStockEntryDesk";
export const GET_STOCK_VERIFICATION = "pagination/getStockVerificationList";
export const GET_ADD_STOCK_VERIFICATION_LIST =
  "pagination/getStockVerificationLists";
export const ADD_STOCK_VERIFICATION = "post/postStockVerification";
export const GET_DRUG_CONDEMNATION_LIST = "pagination/getDrugCondemnationList";
export const GET_ADD_DRUG_CONDEMNATION_LIST =
  "pagination/getDrugCondemnationLists";
export const GET_STORE_RACK_LIST = "pagination/getStoreUpdateRackLists";
//Demand Module
export const NOTIFICATION_LIST = "pagination/getNotificationList";
export const OPEN_NOTIFICATION_DESK = "calls/getOpenNotificationDesk";
export const GET_DRUG_LIST_BY_PROGRAM_ID = "calls/getDrugListByProgramID";
export const SAVE_DEMAND_NOTIFICATION = "Notification/createNotification";
export const GET_ANNUAL_DEMAND_LIST = "Notification/generateAnnualDemand";
export const GET_COMPILE_DEMAND_LIST = "Notification/getCompileDemand";
export const SAVE_GENERATE_ANNUAL_DEMAND =
  "Notification/saveGenerateAnnualDemand";
export const SAVE_COMPILE_DEMAND = "Notification/";
export const DELETE_NOTIFICATION = "Notification/notificationDelete";
export const UPDATE_NOTIFICATION = "Notification/notificationUpdate";

// Order Management Module
export const APPROVAL_DESK_LIST = "pagination/getAllAnnualDemandList";
export const APPROVAL_PURCHASE_ORDER_LIST =
  "pagination/getAllPurchaseOrderListForApproval";

export const APPROVAL_INTENT_APPROVAL_LIST =
  "pagination/getAllIndentForApprovalList";

export const TRANSFER_APPROVAL_LIST = "pagination/getAllTransferApprovalList";
export const TRANSFER_APPROVAL_LIST_HQ =
  "pagination/getAllTransferApprovalHQList";

export const STORE_DESK_LISTING = "pagination/getStoreList";
export const ALL_ACTIVITY_TYPE_LIST = "admin/getAllActivityTypeList";
export const ACTIVITY_LIST_BY_CODE = "admin/getActivityListByType";
export const UPDATE_DRUG_MANUFACTURE = "post/updateManufacture";
export const GET_MANUFACTURING_LIST = "pagination/getManufacturerList";
export const CREATE_DRUG_MANUFACTURE = "post/createDrugManufacture";

export const DELETE_DRUG_MANUFACTURE = "post/deleteManufacture";
export const GET_CENTRAL_PURCHASE = "pagination/getCentralPurchaseList";
// end of Order Management Module

//Issue Desk Module
export const GET_ISSUE_DESK_LIST = "pagination/getIssueDeskList";
export const GET_ISSUE_TO_THIRD_PARTY_LIST =
  "pagination/getIssueThirdPartyList";
export const GET_INTENT_LIST = "pagination/getIndentList";
export const GET_OFFLINE_ISSUE_LIST = "pagination/getOfflineIssueList";
export const GET_ISSUE_CAMP_LIST = "pagination/getIssueCampList";
export const GET_RETURN_DESK_LIST = "pagination/getReturnDeskLists";
export const GET_THIRD_PARTY_RETURN_LIST =
  "pagination/getReturnThirdPartyLists";
export const GET_SUB_STORE_RETURN_LIST = "pagination/getReturnSubStoreLists";
export const GET_MISCELLANOUS_CONSMP_LIST =
  "pagination/getStockConsumptionLists";
export const GET_ADD_MISCELLANOUS_LIST =
  "pagination/getStockAddConsumptionLists";

export const SAVE_ISSUE_TO_THIRD_PARTY = "issue/saveIssueToThirdParty";
export const GET_INTENT_DRUG_BY_INTENTNO = "issue/getIssueToSubStore";
// End of Issue Desk Module

// Requisition Module
export const GET_INTENT_DRUG = "pagination/getIndentsRequisitionLists";
export const GET_TRANSFER_LIST = "pagination/getTransferLists";

//Receiving
export const GET_RECEIVED_DRUG_LISTS = "pagination/getReceiveDrugList";

export const REFRESH_TOKEN = "auth/refresh-token";

//reports

export const GET_STOCK_LEDGER_REPORTS = "calls/getStockLedgerReport";
export const GET_CLASS_WISE_DRUG = "calls/getDrugClassWiseReport";
export const POST_REPORT_SERVICE = "post/postReportData";

export const GET_STOCK_STATUS_REPORT = "calls/getStockStatusReport";
export const POST_STOCK_STATUS_REPORT = "post/getStockStatusData";

export const GET_SUBSTORE_BY_STORE = "calls/getSubStoreByToStore";

export const DELETE_FUNDING = "post/deleteFunding";
export const UPDATE_FUNDING = "post/updateFunding";
