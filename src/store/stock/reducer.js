import {
  ADD_STOCK_ENTRY,
  ADD_STOCK_ENTRY_RESPONSE,
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
  console.log("aciton", action.type);
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

    default:
      state = { ...state };
      break;
  }
  return state;
};
export default stock;
