import {
  OPEN_CREATE_EXPENSE_MODAL,
  CLOSE_CREATE_EXPENSE_MODAL
} from "actions/actionTypes";

const defaultState = {
  createExpense: false
};

const modalReducer = (state = defaultState, action) => {
  switch (action.type) {
    case OPEN_CREATE_EXPENSE_MODAL:
      return {
        ...state,
        createExpense: true
      };
    case CLOSE_CREATE_EXPENSE_MODAL:
      return {
        ...state,
        createExpense: false
      };
    default:
      return state;
  }
};

export default modalReducer;
