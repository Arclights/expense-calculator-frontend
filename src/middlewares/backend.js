import axios from "axios";
import {
  GET_CALCULATIONS_LIST,
  CREATE_CALCULATION,
  GET_PERSONS,
  GET_CARDS,
  GET_CALCULATION
} from "actions/actionTypes";
import { getCalculationsListSuccess, getCalculationsListFailure } from "actions";
import {
  createCalculationSuccess,
  createCalculationFail,
  getCalculationSuccess,
  getCalculationFail,
  getCardsSuccess,
  getCardsFail,
  getPersonsFail,
  getPersonsSuccess,
  getCalculation,
  getCards,
  getPersons
} from "../actions";
import { GET_ALL_DATA } from "../actions/actionTypes";

const shouldDo = responseState => {
  if (responseState && responseState.isProcessing) {
    return false;
  } else {
    return true;
  }
};

const shouldGetExpesesList = store => shouldDo(store.getState().expenseList);
const shouldCreateCalculation = store => shouldDo(store.getState().createCalculation);
const shouldGetCalculation = store => shouldDo(store.getState().expense);
const shoudlGetCards = store => shouldDo(store.getState().cards);
const shouldGetPersons = store => shouldDo(store.getState().persons);

const simpleGet = (store, endpoint, actionOnSuccess, actionOnError) =>
  axios
    .get(endpoint)
    .then(response => store.dispatch(actionOnSuccess(response.data)))
    .catch(error => store.dispatch(actionOnError(error)));

const backendCallInit = (store, next, action) => (onCondition, call) => {
  if (onCondition(store)) {
    call(call);
  }
  next(action);
};

const backend = store => next => action => {
  const backendCall = backendCallInit(store, next, action);
  switch (action.type) {
    case GET_CALCULATIONS_LIST:
      backendCall(shouldGetExpesesList, () =>
        simpleGet(
          store,
          "http://localhost:8080/calculations",
          getCalculationsListSuccess,
          getCalculationsListFailure
        )
      );
      break;
    case CREATE_CALCULATION:
      backendCall(shouldCreateCalculation, () =>
        axios
          .put("http://localhost:8080/calculations", {
            month: action.month,
            year: action.year
          })
          .then(response => store.dispatch(createCalculationSuccess(response.data)))
          .catch(error => store.dispatch(createCalculationFail(error)))
      );
      break;
    case GET_ALL_DATA:
      store.dispatch(getCalculation(action.year, action.month));
      store.dispatch(getCards());
      store.dispatch(getPersons());
      break;
    case GET_CALCULATION:
      backendCall(shouldGetCalculation, () =>
        simpleGet(
          store,
          `http://localhost:8080/calculations/${action.year}/${action.month}`,
          getCalculationSuccess,
          getCalculationFail
        )
      );
      break;
    case GET_CARDS:
      backendCall(shoudlGetCards, () =>
        simpleGet(
          store,
          "http://localhost:8080/cards",
          getCardsSuccess,
          getCardsFail
        )
      );
      break;
    case GET_PERSONS:
      backendCall(shouldGetPersons, () =>
        simpleGet(
          store,
          "http://localhost:8080/persons",
          getPersonsSuccess,
          getPersonsFail
        )
      );
      break;
    default:
      next(action);
  }
};

export default backend;
