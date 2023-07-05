import { GET_ADD_STOCK_VERIFICATION_LIST } from "../../common/constant/constants";
import {
  ADD_DRUG_CONDEMNATION,
  ADD_DRUG_CONDEMNATION_RESPONSE,
  ADD_STOCK_ENTRY,
  ADD_STOCK_ENTRY_RESPONSE,
  ADD_STOCK_VERIFICATION,
  ADD_STOCK_VERIFICATION_RESPONSE,
  GET_ADD_DRUG_CONDEMNATION_LIST,
  GET_ADD_DRUG_CONDEMNATION_LIST_RESPONSE,
  GET_ADD_STOCK_VERIFICATION_LIST_RESPONSE,
  GET_DRUG_CONDEMNATION_LSIT,
  GET_DRUG_CONDEMNATION_LSIT_RESPONSE,
  GET_STOCK_DESK_LIST,
  GET_STOCK_DESK_LIST_RESPONSE,
  GET_STOCK_ENTRY_DESK,
  GET_STOCK_ENTRY_DESK_RESPONSE,
  GET_STOCK_VERIFICATION_LIST,
  GET_STOCK_VERIFICATION_LIST_RESPONSE,
  GET_UPDATE_STOCK_RACK_LIST,
  GET_UPDATE_STOCK_RACK_LIST_RESPONSE,
} from "./actionTypes";

const initialState = {
  error: "",
  loading: false,
};

const stock = (state = initialState, action) => {
  switch (action.type) {
    case GET_STOCK_DESK_LIST:
      state = {
        ...state,
      };
      break;
    case GET_STOCK_DESK_LIST_RESPONSE:
      state = {
        ...state,
        stockDeskListResponse: action.payload,
      };
      break;
    case ADD_STOCK_ENTRY:
      state = {
        ...state,
      };
      break;
    case ADD_STOCK_ENTRY_RESPONSE:
      state = {
        ...state,
        addStockEntryResponse: action?.payload,
      };
      break;
    case GET_STOCK_ENTRY_DESK:
      state = {
        ...state,
      };
      break;
    case GET_STOCK_ENTRY_DESK_RESPONSE:
      state = {
        ...state,
        stockEntryDeskResponse: action?.payload,
      };
      break;

    case GET_UPDATE_STOCK_RACK_LIST:
      state = {
        ...state,
      };
      break;
    case GET_UPDATE_STOCK_RACK_LIST_RESPONSE:
      state = {
        ...state,
        updateStockRackListResponse: action?.payload,
      };
      break;
    case GET_STOCK_VERIFICATION_LIST:
      state = {
        ...state,
      };
      break;
    case GET_STOCK_VERIFICATION_LIST_RESPONSE:
      state = {
        ...state,
        stockVerificationListResponse: action?.payload,
      };
      break;

    case GET_ADD_STOCK_VERIFICATION_LIST:
      state = {
        ...state,
      };
      break;
    case GET_ADD_STOCK_VERIFICATION_LIST_RESPONSE:
      state = {
        ...state,
        addStockVerificationListResponse: action?.payload,
      };
      break;
    case ADD_STOCK_VERIFICATION:
      state = {
        ...state,
      };
      break;
    case ADD_STOCK_VERIFICATION_RESPONSE:
      state = {
        ...state,
        addStockVerificationResponse: action?.payload,
      };
      break;
    case GET_DRUG_CONDEMNATION_LSIT:
      state = {
        ...state,
      };
      break;
    case GET_DRUG_CONDEMNATION_LSIT_RESPONSE:
      state = {
        ...state,
        drugCondemnationListResponse: action?.payload,
      };
      break;
    case GET_ADD_DRUG_CONDEMNATION_LIST:
      state = {
        ...state,
      };
      break;
    case GET_ADD_DRUG_CONDEMNATION_LIST_RESPONSE:
      state = {
        ...state,
        addDrugCondemnationListResponse: action?.payload,
      };
      break;
    case ADD_DRUG_CONDEMNATION:
      state = {
        ...state,
      };
      break;
    case ADD_DRUG_CONDEMNATION_RESPONSE:
      state = {
        ...state,
        addDrugCondemnationResponse: action?.payload,
      };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};
export default stock;
