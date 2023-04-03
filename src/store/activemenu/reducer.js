import { SET_ACTIVE_SIDE_MENU, UNSET_ACTIVE_SIDE_MENU } from "./actionTypes";

const initialState = {
    activeSideMenu: false,
  };

  const activemenu = (state = initialState, action) => {
    switch (action.type) {
      case SET_ACTIVE_SIDE_MENU:
        state = {
          ...state,
          activeSideMenu: true,
        };
        break;
      case UNSET_ACTIVE_SIDE_MENU:
        state = {
          ...state,
          activeSideMenu: false,
        };
        break;
      default:
        state = { ...state };
        break;
    }
    return state;
  };
  export default activemenu;