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
export const CREATE_DRUG = "post/createNewDrug";

export const CREATE_NEW_BUDGET = "post/createBudgetDesk";
export const CREATE_NEW_FUNDING = "post/createNewFunding";

export const POST_EDL_MAPPING = "post/createEDLMapping";
export const POST_PROGRAM_FUNDING = "post/createProgramFunding";

export const CREATE_NEW_PROGRAM = "post/createProgram";
export const UPDATE_PROGRAM = "post/updateProgram";
export const DELETE_PROGRAM = "post/deleteProgram";
export const CREATE_NEW_ROLE = "post/createRole";
export const CREATE_NEW_STORE = "post/createStore";

//Drug Desk
export const DRUG_DESK_LISTING = "pagination/getDrugList";
// Progame Desk
export const PROGRAME_DESK_LISTING = "pagination/getProgrammeList";
// Store Desk
export const FUNDING_DESK_LIST = "pagination/getAllFundingSourceList";
export const BUDGET_INTERFACE_LIST = "pagination/getAllBudgetList";
export const GET_EDL_MAPPING_LIST = "calls/getEdlMapping";

export const GET_PROGRAME_FUNDING_MAPPING = "calls/getProgrammeFundingMapping";
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
// End of Issue Desk Module

// Requisition Module
export const GET_INTENT_DRUG = "pagination/getIndentsRequisitionLists";
export const GET_TRANSFER_LIST = "pagination/getTransferLists";

//Receiving
export const GET_RECEIVED_DRUG_LISTS = "pagination/getReceiveDrugList";

export const REFRESH_TOKEN = "auth/refresh-token";
