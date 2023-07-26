import {
  GET_ADD_MISCELLANOUS_LIST,
  GET_ADD_MISCELLANOUS_LIST_RSPONSE,
  GET_INTENT_DRUG,
  GET_INTENT_DRUG_RESPONSE,
  GET_INTENT_ISSUE_LIST,
  GET_INTENT_ISSUE_LIST_RESPONSE,
  GET_ISSUE_CAMP_LIST,
  GET_ISSUE_CAMP_LIST_RESPONSE,
  GET_ISSUE_DESK_LIST,
  GET_ISSUE_DESK_LIST_RESPONSE,
  GET_ISSUE_TO_THIRD_PARTY_LIST,
  GET_ISSUE_TO_THIRD_PARTY_LIST_RESPONSE,
  GET_MISCELLANOUS_STCK_CONSMP_LIST,
  GET_MISCELLANOUS_STCK_CONSMP_LIST_RESPONSE,
  GET_OFFLINE_ISSUE_LIST,
  GET_OFFLINE_ISSUE_LIST_RESPONSE,
  GET_RETURN_DESK_LIST,
  GET_RETURN_DESK_LIST_RESPONSE,
  GET_SUB_STORE_RETURN_LIST,
  GET_SUB_STORE_RETURN_LIST_RESPONSE,
  GET_THIRD_PARTY_RETURN,
  GET_THIRD_PARTY_RETURN_RESPONSE,
  SAVE_ISSUE_AGAINST_INTENT,
  SAVE_ISSUE_AGAINST_INTENT_RESPONSE,
  SAVE_ISSUE_TO_THIRD_PARTY,
  SAVE_ISSUE_TO_THIRD_PARTY_RESPONSE,
  SAVE_OFFLINE_ISSUE,
  SAVE_OFFLINE_ISSUE_RESPONSE,
} from "./actionTypes";

export const getIssueDeskList = (pageDetails) => {
  return {
    type: GET_ISSUE_DESK_LIST,
    payload: pageDetails,
  };
};
export const getIssueDeskListResponse = (issueDeskListResponse) => {
  return {
    type: GET_ISSUE_DESK_LIST_RESPONSE,
    payload: issueDeskListResponse,
  };
};

export const getReturnDeskList = (pageDetails) => {
  return {
    type: GET_RETURN_DESK_LIST,
    payload: pageDetails,
  };
};
export const getReturnDeskListResponse = (returnDeskListResponse) => {
  return {
    type: GET_RETURN_DESK_LIST_RESPONSE,
    payload: returnDeskListResponse,
  };
};
export const getIssueToThirdPartyList = (pageDetails) => {
  return {
    type: GET_ISSUE_TO_THIRD_PARTY_LIST,
    payload: pageDetails,
  };
};
export const getIssueToThirdPartyListResponse = (thirdPartyListResponse) => {
  return {
    type: GET_ISSUE_TO_THIRD_PARTY_LIST_RESPONSE,
    payload: thirdPartyListResponse,
  };
};

export const getIntentIssueList = (pageDetails) => {
  return {
    type: GET_INTENT_ISSUE_LIST,
    payload: pageDetails,
  };
};
export const getIntentIssueListResponse = (intentListResponse) => {
  return {
    type: GET_INTENT_ISSUE_LIST_RESPONSE,
    payload: intentListResponse,
  };
};
export const getIssueCampList = (pageDetails) => {
  return {
    type: GET_ISSUE_CAMP_LIST,
    payload: pageDetails,
  };
};
export const getIssueCampListResponse = (issueCampListResponse) => {
  return {
    type: GET_ISSUE_CAMP_LIST_RESPONSE,
    payload: issueCampListResponse,
  };
};
export const getOfflineIssueList = (pageDetails) => {
  return {
    type: GET_OFFLINE_ISSUE_LIST,
    payload: pageDetails,
  };
};
export const getOfflineIssueListResponse = (offlineIssueListResponse) => {
  return {
    type: GET_OFFLINE_ISSUE_LIST_RESPONSE,
    payload: offlineIssueListResponse,
  };
};

export const getSubStoreReturnList = (pageDetails) => {
  return {
    type: GET_SUB_STORE_RETURN_LIST,
    payload: pageDetails,
  };
};
export const getSubStoreReturnListResponse = (subStoreReturnListResp) => {
  return {
    type: GET_SUB_STORE_RETURN_LIST_RESPONSE,
    payload: subStoreReturnListResp,
  };
};

export const getThirdPartyReturnList = (pageDetails) => {
  return {
    type: GET_THIRD_PARTY_RETURN,
    payload: pageDetails,
  };
};
export const getThirdPartyReturnListResponse = (thirdPartyReturnListResp) => {
  return {
    type: GET_THIRD_PARTY_RETURN_RESPONSE,
    payload: thirdPartyReturnListResp,
  };
};

export const getMiscellanousStckConsmpList = (pageDetails) => {
  console.log("pageDetails", pageDetails);
  return {
    type: GET_MISCELLANOUS_STCK_CONSMP_LIST,
    payload: pageDetails,
  };
};
export const getMiscellanousStckConsmpListResp = (misStockConsmpListResp) => {
  return {
    type: GET_MISCELLANOUS_STCK_CONSMP_LIST_RESPONSE,
    payload: misStockConsmpListResp,
  };
};

export const getAddMiscellanousList = (pageDetails) => {
  return {
    type: GET_ADD_MISCELLANOUS_LIST,
    payload: pageDetails,
  };
};
export const getAddMiscellanousListResponse = (addMisListResp) => {
  return {
    type: GET_ADD_MISCELLANOUS_LIST_RSPONSE,
    payload: addMisListResp,
  };
};

export const saveIssueToThirdParty = (saveThirdPartyDetails) => {
  return {
    type: SAVE_ISSUE_TO_THIRD_PARTY,
    payload: saveThirdPartyDetails,
  };
};
export const saveIssueToThirdPartyResponse = (saveThirdPartyDetailsResp) => {
  return {
    type: SAVE_ISSUE_TO_THIRD_PARTY_RESPONSE,
    payload: saveThirdPartyDetailsResp,
  };
};

export const getIntentDrug = (intentNo) => {
  return {
    type: GET_INTENT_DRUG,
    payload: intentNo,
  };
};

export const getIntentDrugResponse = (intentDrugResponse) => {
  return {
    type: GET_INTENT_DRUG_RESPONSE,
    payload: intentDrugResponse,
  };
};

export const saveIssueAgainstIntent = (intentDetails) => {
  return {
    type: SAVE_ISSUE_AGAINST_INTENT,
    payload: intentDetails,
  };
};

export const saveIssueAgainstIntentResponse = (saveIssueIntentResp) => {
  return {
    type: SAVE_ISSUE_AGAINST_INTENT_RESPONSE,
    payload: saveIssueIntentResp,
  };
};

export const saveOfflineIssue = (offlineIssueDetails) => {
  return {
    type: SAVE_OFFLINE_ISSUE,
    payload: offlineIssueDetails,
  };
};

export const saveOfflineIssueResponse = (saveOfflineIssueResp) => {
  return {
    type: SAVE_OFFLINE_ISSUE_RESPONSE,
    payload: saveOfflineIssueResp,
  };
};
