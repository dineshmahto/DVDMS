import { ACTIVE_SIDE_MENU, UNACTIVE_SIDE_MENU } from "./actionTypes";

export const setActiveSideMenu = (activeMenuItem) => {
    return {
      type: ACTIVE_SIDE_MENU,
      payload: activeMenuItem,
    };
  };

  export const unsetActiveSideMenu = (activeMenuItem,) => {
    return {
      type: UNACTIVE_SIDE_MENU,
      payload: activeMenuItem,
    };
  };