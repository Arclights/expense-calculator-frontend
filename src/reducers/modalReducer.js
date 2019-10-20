import {
  OPEN_CREATE_CALCULATION_MODAL,
  CLOSE_CREATE_CALCULATION_MODAL
} from "actions/actionTypes";

const defaultState = {
  createCalculation: false
};

const modalReducer = (state = defaultState, action) => {
  switch (action.type) {
    case OPEN_CREATE_CALCULATION_MODAL:
      return {
        ...state,
        createCalculation: true
      };
    case CLOSE_CREATE_CALCULATION_MODAL:
      return {
        ...state,
        createCalculation: false
      };
    default:
      return state;
  }
};

export default modalReducer;
