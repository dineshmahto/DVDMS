import {
  GET_STOCK_LEDGER,
  GET_STOCK_LEDGER_RESPONSE,
  GET_CLASSWISE_DRUG,
  GET_CLASSWISE_DRUG_RESPONSE,
  POST_STOCK_REPORT,
  POST_STOCK_REPORT_RESPONSE,
  GET_STOCK_STATUS,
  GET_STOCK_STATUS_RESPONSE,
  POST_STATUS_REPORT,
  POST_STATUS_REPORT_RESPONSE,
  GET_SUBSTORE_BY_STOREID,
  GET_SUBSTORE_BY_STOREID_RESPONSE,
} from "./actionType";

const initialState = {
  error: "",
  loading: false,
};

const report = (state = initialState, action) => {
  switch (action.type) {
    case GET_STOCK_LEDGER:
      state = {
        ...state,
      };
      break;
    case GET_STOCK_LEDGER_RESPONSE:
      state = {
        ...state,
        stockLedgerResp: action?.payload,
      };
      break;
    case GET_STOCK_STATUS:
      state = {
        ...state,
      };
      break;
    case GET_STOCK_STATUS_RESPONSE:
      state = {
        ...state,
        stockStatusResp: action?.payload,
      };
      break;
    case GET_CLASSWISE_DRUG:
      state = {
        ...state,
      };
      break;
    case GET_CLASSWISE_DRUG_RESPONSE:
      state = {
        ...state,
        classwiswDrugResp: action?.payload,
      };
      break;
    case POST_STOCK_REPORT:
      state = {
        ...state,
      };
      break;
    case POST_STOCK_REPORT_RESPONSE:
      state = {
        ...state,
        post: action?.payload,
      };
      break;
    case POST_STATUS_REPORT:
      state = {
        ...state,
      };
      break;
    case POST_STATUS_REPORT_RESPONSE:
      state = {
        ...state,
        postStockStatusRes: action?.payload,
      };
      break;
    case GET_SUBSTORE_BY_STOREID:
      state = {
        ...state,
      };
      break;
    case GET_SUBSTORE_BY_STOREID_RESPONSE:
      state = {
        ...state,
        storewiseSubStoreResp: action?.payload,
      };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default report;
