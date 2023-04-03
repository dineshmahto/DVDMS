import { SET_ACTIVE_SIDE_MENU, UNSET_ACTIVE_SIDE_MENU } from "./actionTypes";

export const setActiveSideMenu = () => {
    return {
      type: SET_ACTIVE_SIDE_MENU,
    };
  };

  export const unsetActiveSideMenu = () => {
    return {
      type: UNSET_ACTIVE_SIDE_MENU,
    };
  };