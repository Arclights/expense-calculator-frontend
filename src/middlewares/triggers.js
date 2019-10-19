import { CREATE_EXPENSE_SUCCESS } from "../actions/actionTypes";
import { getExpensesList } from "../actions";

const reducer = store => next => action => {
  switch (action.type) {
    case CREATE_EXPENSE_SUCCESS:
      store.dispatch(getExpensesList());
      next(action);
      break;
    default:
      next(action);
  }
};

export default reducer;
