import { combineReducers } from "redux";
import drawer from "./drawerReducer";
import modal from "./modalReducer";
import calculation from "./calculationReducer";
import {
  GET_CALCULATIONS_LIST,
  GET_CALCULATIONS_LIST_SUCCESS,
  GET_CALCULATIONS_LIST_FAIL,
  CREATE_CALCULATION,
  CREATE_CALCULATION_SUCCESS,
  CREATE_CALCULATION_FAIL,
  GET_CARDS,
  GET_CARDS_SUCCESS,
  GET_CARDS_FAIL,
  GET_PERSONS,
  GET_PERSONS_SUCCESS,
  GET_PERSONS_FAIL
} from "actions/actionTypes";

const defaultState = {
  isProcessing: false,
  error: undefined,
  data: undefined
};

const simpleResponseReducer = (initType, successType, failureType) => (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case initType:
      return {
        ...state,
        error: undefined,
        isProcessing: true
      };
    case successType:
      return {
        ...state,
        isProcessing: false,
        error: undefined,
        data: action.data
      };
    case failureType:
      return {
        ...state,
        error: action.error,
        isProcessing: false,
        data: undefined
      };
    default:
      return state;
  }
};

export default combineReducers({
  drawer,
  calculationListings: simpleResponseReducer(
    GET_CALCULATIONS_LIST,
    GET_CALCULATIONS_LIST_SUCCESS,
    GET_CALCULATIONS_LIST_FAIL
  ),
  modal,
  createCalculation: simpleResponseReducer(
    CREATE_CALCULATION,
    CREATE_CALCULATION_SUCCESS,
    CREATE_CALCULATION_FAIL
  ),
  calculation,
  cards: simpleResponseReducer(GET_CARDS, GET_CARDS_SUCCESS, GET_CARDS_FAIL),
  persons: simpleResponseReducer(
    GET_PERSONS,
    GET_PERSONS_SUCCESS,
    GET_PERSONS_FAIL
  )
});
