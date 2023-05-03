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

const initialState = {
  error: "",
  loading: false,
};

const issueReturn = (state = initialState, action) => {
  switch (action.type) {
    case GET_ISSUE_DESK_LIST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case GET_ISSUE_DESK_LIST_RESPONSE:
      state = {
        ...state,
        loading: false,
        issueDeskListResponse: action?.payload,
      };
      break;
    case GET_RETURN_DESK_LIST:
      state = {
        ...state,
      };
      break;
    case GET_RETURN_DESK_LIST_RESPONSE:
      state = {
        ...state,
        returnDeskListResponse: action?.payload,
      };
      break;
    case GET_ISSUE_TO_THIRD_PARTY_LIST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case GET_ISSUE_TO_THIRD_PARTY_LIST_RESPONSE:
      state = {
        ...state,
        loading: false,
        thirdPartyListResponse: action?.payload,
      };
      break;
    case GET_INTENT_ISSUE_LIST:
      state = {
        ...state,
      };
      break;
    case GET_INTENT_ISSUE_LIST_RESPONSE:
      state = {
        ...state,
        intentIssueListResponse: action?.payload,
      };
      break;
    case GET_ISSUE_CAMP_LIST:
      state = {
        ...state,
      };
      break;
    case GET_ISSUE_CAMP_LIST_RESPONSE:
      state = {
        ...state,
        issueCampListResponse: action?.payload,
      };
      break;
    case GET_OFFLINE_ISSUE_LIST:
      state = {
        ...state,
      };
      break;
    case GET_OFFLINE_ISSUE_LIST_RESPONSE:
      state = {
        ...state,
        offlineIssueListResponse: action?.payload,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};
export default issueReturn;