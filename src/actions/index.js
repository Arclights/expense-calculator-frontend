import {
  OPEN_DRAWER,
  CLOSE_DRAWER,
  GET_EXPENSES_LIST,
  GET_EXPENSES_LIST_SUCCESS,
  GET_EXPENSES_LIST_FAIL,
  OPEN_CREATE_EXPENSE_MODAL,
  CLOSE_CREATE_EXPENSE_MODAL,
  CREATE_EXPENSE,
  CREATE_EXPENSE_SUCCESS,
  CREATE_EXPENSE_FAIL
} from "./actionTypes";

const simpleAction = type => () => ({
  type
});

export const openDrawer = simpleAction(OPEN_DRAWER);
export const closeDrawer = simpleAction(CLOSE_DRAWER);

export const openCreateExpenseModal = simpleAction(OPEN_CREATE_EXPENSE_MODAL);
export const closeCreateExpenseModal = simpleAction(CLOSE_CREATE_EXPENSE_MODAL);

export const getExpensesList = simpleAction(GET_EXPENSES_LIST);

export const getExpensesListSuccess = response => ({
  type: GET_EXPENSES_LIST_SUCCESS,
  data: response
});

export const getExpensesListFailure = error => ({
  type: GET_EXPENSES_LIST_FAIL,
  error
});

export const createExpense = (month, year) => ({
  type: CREATE_EXPENSE,
  month,
  year
});

export const createExpenseSuccess = response => ({
  type: CREATE_EXPENSE_SUCCESS,
  data: response
});

export const createExpenseFail = error => ({
  type: CREATE_EXPENSE_FAIL,
  error
});
