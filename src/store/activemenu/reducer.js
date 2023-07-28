import { ACTIVE_SIDE_MENU, UNACTIVE_SIDE_MENU } from "./actionTypes";

const initialState = {
  activeSideMenuItem: {},
  };

  const activemenu = (state = initialState, action) => {
    switch (action.type) {
      case ACTIVE_SIDE_MENU:
        state = { ...state,
                  activeSideMenuItem: action.payload
                };
                localStorage.setItem("ACTIVE_SIDE_MENU_ITEM", JSON.stringify(action.payload));
        break;
      case UNACTIVE_SIDE_MENU:
        state = {
                  ...state,
                };
        break;
      default:
        state = { ...state };
        break;
    }
    return state;
  };
  export default activemenu;