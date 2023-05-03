import {
  GET_NOTIFICATION_LIST,
  GET_ALL_OPEN_NOTIFICATION_LIST,
  GET_ALL_OPEN_NOTIFICATION_LIST_RESPONSE,
  GET_NOTIFICATION_LIST_RESPONSE,
  GET_DRUG_BY_PROGRAMME_ID,
  GET_DRUG_BY_PROGRAMME_ID_RESPONSE,
  SAVE_DEMAND_NOTIFICATION,
  SAVE_DEMAND_NOTIFICATION_RESPONSE,
  CANCEL_NOTIFICATION,
  CANCEL_NOTIFICATION_RESPONSE,
  UPDATE_NOTIFICATION,
  UPDATE_NOTIFICATION_RESPONSE,
} from "./actionTypes";

const initialState = {
  error: "",
  loading: false,
};

const demand = (state = initialState, action) => {
  console.log("action", action.type);
  switch (action.type) {
    case GET_NOTIFICATION_LIST:
      state = {
        ...state,
      };
      break;
    case GET_NOTIFICATION_LIST_RESPONSE:
      state = {
        ...state,
        notficationListResponse: action.payload,
      };
      break;
    case GET_ALL_OPEN_NOTIFICATION_LIST:
      state = {
        ...state,
      };
      break;
    case GET_ALL_OPEN_NOTIFICATION_LIST_RESPONSE:
      state = {
        ...state,
        openNotificationListResponse: action.payload,
      };
      break;

    case GET_DRUG_BY_PROGRAMME_ID:
      state = {
        ...state,
      };
      break;
    case GET_DRUG_BY_PROGRAMME_ID_RESPONSE:
      state = {
        ...state,
        drugListByProgramIdResponse: action.payload,
      };
      break;
    case SAVE_DEMAND_NOTIFICATION:
      state = {
        ...state,
      };
      break;
    case SAVE_DEMAND_NOTIFICATION_RESPONSE:
      state = {
        ...state,
        saveDemandNotificationResponse: action.payload,
      };
      break;

    case CANCEL_NOTIFICATION:
      state = {
        ...state,
      };
      break;
    case CANCEL_NOTIFICATION_RESPONSE:
      state = {
        ...state,
        cancelNotificationResponse: action?.payload,
      };
      break;

    case UPDATE_NOTIFICATION:
      state = {
        ...state,
      };
      break;
    case UPDATE_NOTIFICATION_RESPONSE:
      state = {
        ...state,
        updateNotificationResponse: action?.payload,
      };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};
export default demand;
