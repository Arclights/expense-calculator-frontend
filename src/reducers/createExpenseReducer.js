import {
  CREATE_EXPENSE_SUCCESS,
  CREATE_EXPENSE_FAIL,
  CREATE_EXPENSE
} from "../actions/actionTypes";

const defaultState = {
  processing: false,
  error: undefined
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case CREATE_EXPENSE:
      return {
        ...state,
        processing: true,
        error: undefined
      };
    case CREATE_EXPENSE_SUCCESS:
      return {
        ...state,
        processing: false,
        error: undefined
      };
    case CREATE_EXPENSE_FAIL:
      return {
        ...state,
        processing: false,
        error: action.error.message
      };
    default:
      return state;
  }
};

export default reducer;
