import {
  GET_CALCULATION,
  GET_CALCULATION_SUCCESS,
  GET_CALCULATION_FAIL,
  ADD_EXPENSE,
  UPDATE_EXPENSE,
  DELETE_EXPENSE
} from "../actions/actionTypes";

const defaultState = {
  isProcessing: false,
  error: undefined,
  data: undefined
};

const reducer = (state = defaultState, action) => {
  console.log(action.type);
  console.log(action);
  switch (action.type) {
    case GET_CALCULATION:
      return {
        ...state,
        error: undefined,
        isProcessing: true
      };
    case GET_CALCULATION_SUCCESS:
      return {
        ...state,
        isProcessing: false,
        error: undefined,
        data: action.data
      };
    case GET_CALCULATION_FAIL:
      return {
        ...state,
        error: action.error,
        isProcessing: false,
        data: undefined
      };
    case ADD_EXPENSE:
      return {
        ...state,
        data: {
          ...state.data,
          expenses: [
            ...(state.data.expenses ? state.data.expenses : []),
            {
              amount: 0.0,
              comment: undefined,
              card: undefined
            }
          ]
        }
      };
    case UPDATE_EXPENSE:
      return {
        ...state,
        data: {
          ...state.data,
          expenses: updateExpenses(
            [...state.data.expenses],
            action.index,
            action.expense
          )
        }
      };
    case DELETE_EXPENSE:
      return {
        ...state,
        data: {
          ...state.data,
          expenses: deleteExpense([...state.data.expenses], action.index)
        }
      };
    default:
      return state;
  }
};

const updateExpenses = (expenses, index, updatedExpense) => {
  expenses.splice(index, 1, updatedExpense);
  return expenses;
};

const deleteExpense = (expenses, index) => {
  expenses.splice(index, 1);
  return expenses;
};

export default reducer;
