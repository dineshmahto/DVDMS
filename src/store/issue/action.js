import {
  GET_INTENT_ISSUE_LIST,
  GET_INTENT_ISSUE_LIST_RESPONSE,
  GET_ISSUE_CAMP_LIST,
  GET_ISSUE_CAMP_LIST_RESPONSE,
  GET_ISSUE_DESK_LIST,
  GET_ISSUE_DESK_LIST_RESPONSE,
  GET_ISSUE_TO_THIRD_PARTY_LIST,
  GET_ISSUE_TO_THIRD_PARTY_LIST_RESPONSE,
  GET_OFFLINE_ISSUE_LIST,
  GET_OFFLINE_ISSUE_LIST_RESPONSE,
  GET_RETURN_DESK_LIST,
  GET_RETURN_DESK_LIST_RESPONSE,
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
