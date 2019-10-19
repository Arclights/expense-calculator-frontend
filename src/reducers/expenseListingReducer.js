import {
  GET_EXPENSES_LIST,
  GET_EXPENSES_LIST_SUCCESS,
  GET_EXPENSES_LIST_FAIL
} from "actions/actionTypes";

const defaultState = {
  error: undefined,
  isFetching: false,
  expenses: []
};

const expenseListing = (state = defaultState, action) => {
  console.log("expenseListing");
  console.log(action);
  switch (action.type) {
    case GET_EXPENSES_LIST:
      console.log("GET_EXPENSES_LIST");
      return {
        ...state,
        isFetching: true
      };
    case GET_EXPENSES_LIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        expenses: action.data
      };
    case GET_EXPENSES_LIST_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default expenseListing;
