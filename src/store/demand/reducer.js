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
  GET_ANNUAL_DEMAND_NOTIFICATION,
  GET_ANNUAL_DEMAND_NOTIFICATION_RESPONSE,
  SAVE_GENERATE_ANNUAL_DEMAND,
  SAVE_GENERATE_ANNUAL_DEMAND_RESPONSE,
  GET_COMPILE_DEMAND,
  GET_COMPILE_DEMAND_REPONSE,
  SAVE_COMPILE_DEMAND,
  SAVE_COMPILE_DEMAND_RESPONSE,
} from "./actionTypes";

const initialState = {
  error: "",
  loading: false,
};

const demand = (state = initialState, action) => {
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

    case GET_ANNUAL_DEMAND_NOTIFICATION:
      state = {
        ...state,
      };
      break;
    case GET_ANNUAL_DEMAND_NOTIFICATION_RESPONSE:
      state = {
        ...state,
        annualDemandNotListResp: action?.payload,
      };
      break;

    case GET_COMPILE_DEMAND:
      state = {
        ...state,
      };
      break;
    case GET_COMPILE_DEMAND_REPONSE:
      state = {
        ...state,
        compileDemandResp: action?.payload,
      };
      break;

    case SAVE_GENERATE_ANNUAL_DEMAND:
      state = {
        ...state,
      };
      break;
    case SAVE_GENERATE_ANNUAL_DEMAND_RESPONSE:
      state = {
        ...state,
        saveGenerateAnnualDmdResp: action?.payload,
      };
      break;

    case SAVE_COMPILE_DEMAND:
      state = {
        ...state,
      };
      break;
    case SAVE_COMPILE_DEMAND_RESPONSE:
      state = {
        ...state,
        saveCompileDmdResp: action?.payload,
      };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};
export default demand;
