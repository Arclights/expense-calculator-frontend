import {
  GET_CALCULATION,
  GET_CALCULATION_SUCCESS,
  GET_CALCULATION_FAIL,
  ADD_EXPENSE,
  UPDATE_EXPENSE,
  DELETE_EXPENSE,
  ADD_PERSONAL_VARIABLES,
  ADD_EXPENSE_CORRECTION,
  UPDATE_EXPENSE_CORRECTION,
  DELETE_EXPENSE_CORRECTION,
  DELETE_PERSONAL_VARIABLES,
  UPDATE_PERSONAL_VARIABLES
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
            { id: tempId(), amount: 0.0, comment: undefined, card: undefined }
          ]
        }
      };
    case UPDATE_EXPENSE:
      return {
        ...state,
        data: {
          ...state.data,
          expenses: updateEntry(
            state.data.expenses,
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
          expenses: deleteEntry(state.data.expenses, action.index)
        }
      };
    case ADD_PERSONAL_VARIABLES:
      return {
        ...state,
        data: {
          ...state.data,
          personalCalculations: [
            ...(state.data.personalCalculations
              ? state.data.personalCalculations
              : []),
            {
              id: tempId(),
              person: undefined,
              income: 0.0,
              expenseCorrections: []
            }
          ]
        }
      };
    case UPDATE_PERSONAL_VARIABLES:
      return {
        ...state,
        data: {
          ...state.data,
          personalCalculations: updateEntry(
            state.data.personalCalculations,
            action.index,
            action.updatedValue
          )
        }
      };
    case DELETE_PERSONAL_VARIABLES:
      return {
        ...state,
        data: {
          ...state.data,
          personalCalculations: deleteEntry(
            state.data.personalCalculations,
            action.index
          )
        }
      };
    case ADD_EXPENSE_CORRECTION:
      return {
        ...state,
        data: {
          ...state.data,
          personalCalculations: addExpenseCorrection(
            state.data.personalCalculations,
            action.personalCalculationIndex
          )
        }
      };
    case UPDATE_EXPENSE_CORRECTION:
      return {
        ...state,
        data: {
          ...state.data,
          personalCalculations: updateExpenseCorrection(
            state.data.personalCalculations,
            action.personalCalculationIndex,
            action.expenseCorrectionIndex,
            action.correction
          )
        }
      };
    case DELETE_EXPENSE_CORRECTION:
      return {
        ...state,
        data: {
          ...state.data,
          personalCalculations: deleteExpenseCorrection(
            state.data.personalCalculations,
            action.personalCalculationIndex,
            action.expenseCorrectionIndex
          )
        }
      };
    default:
      return state;
  }
};

const addExpenseCorrection = (
  personalCalculations,
  personalCalculationIndex
) => {
  const personalCalculation = personalCalculations[personalCalculationIndex];

  const updatedPersonalCalculations = [...personalCalculations];
  updatedPersonalCalculations.splice(personalCalculationIndex, 1, {
    ...personalCalculation,
    expenseCorrections: [
      ...personalCalculation.expenseCorrections,
      {
        id: tempId(),
        amount: 0.0,
        catergory: undefined,
        comment: undefined
      }
    ]
  });

  return updatedPersonalCalculations;
};

const deleteExpenseCorrection = (
  personalCalculations,
  personalCalculationIndex,
  expenseCorrectionIndex
) => {
  const personalCalculation = personalCalculations[personalCalculationIndex];

  const updatedExpenseCorrections = deleteEntry(
    personalCalculation.expenseCorrections,
    expenseCorrectionIndex
  );

  return updateEntry(personalCalculations, personalCalculationIndex, {
    ...personalCalculation,
    expenseCorrections: updatedExpenseCorrections
  });
};

const updateExpenseCorrection = (
  personalCalculations,
  personalCalculationIndex,
  expenceCorrectionIndex,
  correction
) => {
  const personalCalculation = personalCalculations[personalCalculationIndex];

  const updatedExpenseCorrections = updateEntry(
    personalCalculation.expenseCorrections,
    expenceCorrectionIndex,
    correction
  );

  return updateEntry(personalCalculations, personalCalculationIndex, {
    ...personalCalculation,
    expenseCorrections: updatedExpenseCorrections
  });
};

const updateEntry = (array, index, updatedValue) => {
  const updatedArray = [...array];
  updatedArray.splice(index, 1, updatedValue);
  return updatedArray;
};

const deleteEntry = (array, index) => {
  const updatedArray = [...array];
  updatedArray.splice(index, 1);
  return updatedArray;
};

const tempId = () => "tempId_" + Math.floor(Math.random() * 1000);

export default reducer;
