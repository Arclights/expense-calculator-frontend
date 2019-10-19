import { CREATE_EXPENSE_SUCCESS } from "../actions/actionTypes";
import history from "../history";

const reducer = store => next => action => {
  switch (action.type) {
    case CREATE_EXPENSE_SUCCESS:
      history.push(`/expense/${action.data.year}/${action.data.month}`);
      next(action);
      break;
    default:
      next(action);
  }
};

export default reducer;
