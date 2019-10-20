import {
  OPEN_DRAWER,
  CLOSE_DRAWER,
  GET_CALCULATIONS_LIST,
  GET_CALCULATIONS_LIST_SUCCESS,
  GET_CALCULATIONS_LIST_FAIL,
  OPEN_CREATE_CALCULATION_MODAL,
  CLOSE_CREATE_CALCULATION_MODAL,
  CREATE_CALCULATION,
  CREATE_CALCULATION_SUCCESS,
  CREATE_CALCULATION_FAIL,
  GET_CALCULATION,
  GET_CALCULATION_SUCCESS,
  GET_CALCULATION_FAIL,
  GET_CARDS,
  GET_CARDS_SUCCESS,
  GET_CARDS_FAIL,
  GET_PERSONS,
  GET_PERSONS_SUCCESS,
  GET_PERSONS_FAIL,
  GET_ALL_DATA,
  ADD_EXPENSE,
  UPDATE_EXPENSE,
  DELETE_EXPENSE
} from "./actionTypes";

const simpleAction = type => () => ({
  type
});

const simpleRequestSuccess = type => response => ({
  type: type,
  data: response
});

const simpleRequestFailure = type => error => ({
  type: type,
  error
});

/* Drawer */
export const openDrawer = simpleAction(OPEN_DRAWER);
export const closeDrawer = simpleAction(CLOSE_DRAWER);

/* Modals */
export const openCreateCalculationModal = simpleAction(
  OPEN_CREATE_CALCULATION_MODAL
);
export const closeCreateCalculationModal = simpleAction(
  CLOSE_CREATE_CALCULATION_MODAL
);

/* Calculations list */
export const getCalculationsList = simpleAction(GET_CALCULATIONS_LIST);
export const getCalculationsListSuccess = simpleRequestSuccess(
  GET_CALCULATIONS_LIST_SUCCESS
);
export const getCalculationsListFailure = simpleRequestFailure(
  GET_CALCULATIONS_LIST_FAIL
);

/* Creating calculations */
export const createCalculation = (month, year) => ({
  type: CREATE_CALCULATION,
  month,
  year
});
export const createCalculationSuccess = simpleRequestSuccess(
  CREATE_CALCULATION_SUCCESS
);
export const createCalculationFail = simpleRequestFailure(
  CREATE_CALCULATION_FAIL
);

/* All data */
export const getAllData = (year, month) => ({
  type: GET_ALL_DATA,
  year,
  month
});

/* Getting calculations */
export const getCalculation = (year, month) => ({
  type: GET_CALCULATION,
  year,
  month
});
export const getCalculationSuccess = simpleRequestSuccess(
  GET_CALCULATION_SUCCESS
);
export const getCalculationFail = simpleRequestFailure(GET_CALCULATION_FAIL);

/* Manipulate calculations */
export const addExpense = simpleAction(ADD_EXPENSE);
export const updateExpense = (index, card, amount, comment) => ({
  type: UPDATE_EXPENSE,
  index,
  expense: { card, amount, comment }
});
export const deleteExpense = index => ({
  type: DELETE_EXPENSE,
  index
});

/* Cards */
export const getCards = simpleAction(GET_CARDS);
export const getCardsSuccess = simpleRequestSuccess(GET_CARDS_SUCCESS);
export const getCardsFail = simpleRequestFailure(GET_CARDS_FAIL);

/* Persons */
export const getPersons = simpleAction(GET_PERSONS);
export const getPersonsSuccess = simpleRequestSuccess(GET_PERSONS_SUCCESS);
export const getPersonsFail = simpleRequestFailure(GET_PERSONS_FAIL);
