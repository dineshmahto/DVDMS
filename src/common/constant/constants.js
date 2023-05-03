//Login
export const LOGIN = "auth/authenticate";
//Logout
export const LOGOUT = "logout";
//Dashboard
export const GET_DASHBOARD_CARD_DATA = "dashboard/details";
// Demand
export const GET_NOTIFICATION_LIST = "pagination/getNotificationList";

// Admin Module
// Role Desk
export const ROLE_LISTING = "pagination/getRoleList";
//User Desk
export const USER_LISTING = "pagination/getUserList";
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

//Issue Desk Module
export const GET_ISSUE_DESK_LIST = "pagination/getIssueDeskList";
export const GET_ISSUE_TO_THIRD_PARTY_LIST =
  "pagination/getIssueThirdPartyList";
export const GET_INTENT_LIST = "pagination/getIndentList";
export const GET_OFFLINE_ISSUE_LIST = "pagination/getOfflineIssueList";
export const GET_ISSUE_CAMP_LIST = "pagination/getIssueCampList";
