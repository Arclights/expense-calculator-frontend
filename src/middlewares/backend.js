import axios from "axios";
import { GET_EXPENSES_LIST, CREATE_EXPENSE } from "actions/actionTypes";
import { getExpensesListSuccess, getExpensesListFailure } from "actions";
import { createExpenseSuccess, createExpenseFail } from "../actions";

const shouldGetExpesesList = state => {
  if (state.expenseList && state.expensesList.isFetching) {
    return false;
  } else {
    return true;
  }
};

const shouldCreateExpense = state => {
  if (state.createExpense && state.createExpense.isProcessing) {
    return false;
  } else {
    return true;
  }
};

const backend = store => next => action => {
  switch (action.type) {
    case GET_EXPENSES_LIST:
      if (shouldGetExpesesList(store.getState())) {
        console.log("requesting expenses list");
        axios
          .get("http://localhost:8080/calculations")
          .then(response => {
            console.log(response);
            store.dispatch(getExpensesListSuccess(response.data));
          })
          .catch(error => store.dispatch(getExpensesListFailure(error)));
      }
      next(action);
      break;
    case CREATE_EXPENSE:
      if (shouldCreateExpense(store.getState())) {
        console.log(
          `Creating expense for month ${action.month} and year ${action.year}`
        );
        axios
          .put("http://localhost:8080/calculations", {
            month: action.month,
            year: action.year
          })
          .then(response => {
            console.log(response);
            store.dispatch(createExpenseSuccess(response.data));
          })
          .catch(error => store.dispatch(createExpenseFail(error)));
      }
      next(action);
      break;
    default:
      next(action);
  }
};

export default backend;
