import { OPEN_DRAWER, CLOSE_DRAWER } from "actions/actionTypes";

const defaultState = {
  isOpen: false
};

const drawer = (state = defaultState, action) => {
  switch (action.type) {
    case OPEN_DRAWER:
      return {
        ...state,
        isOpen: true
      };
    case CLOSE_DRAWER:
      return {
        ...state,
        isOpen: false
      };
    default:
      return state;
  }
};

export default drawer;
