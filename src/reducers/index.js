import { combineReducers } from "redux";
import drawer from "./drawerReducer";
import expenseListing from "./expenseListingReducer";
import modal from "./modalReducer";
import createExpense from "./createExpenseReducer";

export default combineReducers({
  drawer,
  expenseListing,
  modal,
  createExpense
});
