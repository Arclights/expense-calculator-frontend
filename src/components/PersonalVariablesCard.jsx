import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Fab,
  Paper,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Select,
  IconButton
} from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";
import {
  addPersonalVariables,
  addExpenseCorrection,
  updateExpenseCorrection,
  deletePersonalVariables,
  updatePersonalVariables,
  deleteExpenseCorrection
} from "./../actions";

const PersonalVariablesCard = ({
  personalCalculations,
  persons,
  categories,
  addPersonalVariables,
  updatePersonalVariables,
  addExpenseCorrection,
  updateExpenseCorrection,
  deletePersonalVariables,
  deleteExpenseCorrection
}) => {
  return (
    <Paper>
      <h5>Personal variables</h5>
      {personalCalculations.map((personalCalculation, index) => (
        <PersonalVariables
          personalCalculation={personalCalculation}
          persons={persons}
          key={personalCalculation.id}
          pvIndex={index}
          addExpenseCorrection={addExpenseCorrection}
          categories={categories}
          updateExpenseCorrection={updateExpenseCorrection}
          deletePersonalVariables={deletePersonalVariables}
          updatePersonalVariables={updatePersonalVariables}
          deleteExpenseCorrection={deleteExpenseCorrection}
        />
      ))}
      <Fab color="primary" arial-label="Add" onClick={addPersonalVariables}>
        <Add />
      </Fab>
    </Paper>
  );
};

const PersonalVariables = ({
  pvIndex,
  personalCalculation,
  persons,
  addExpenseCorrection,
  categories,
  updateExpenseCorrection,
  deletePersonalVariables,
  updatePersonalVariables,
  deleteExpenseCorrection
}) => {
  const id = personalCalculation.id;
  const expenseCorrections = personalCalculation.expenseCorrections;

  const [person, setPerson] = useState(
    personalCalculation.person
      ? personalCalculation.person
      : { id: -1, name: "Select person" }
  );
  const [income, setIncome] = useState(
    personalCalculation.income ? personalCalculation.income : 0.0
  );

  const updatePerson = newPerson => {
    setPerson(newPerson);
    updatePersonalVariables(pvIndex, {
      id,
      person: newPerson,
      income,
      expenseCorrections
    });
  };

  const updateIncome = newIncome => {
    setIncome(newIncome);
    updatePersonalVariables(pvIndex, {
      id,
      person,
      income: newIncome,
      expenseCorrections
    });
  };

  return (
    <div>
      <FormControl>
        <InputLabel>Person</InputLabel>
        <Select
          value={person}
          onChange={event => updatePerson(event.target.value)}
        >
          {persons.map(person => (
            <MenuItem value={person} key={person.id}>
              {person.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        type="number"
        label="Income"
        value={income}
        onChange={event => updateIncome(event.target.value)}
      />
      <IconButton onClick={() => deletePersonalVariables(pvIndex)}>
        <Delete color="secondary" />
      </IconButton>
      <h5>Expense corrections</h5>
      {expenseCorrections.map((ec, index) => (
        <ExpenseCorrection
          expenseCorrection={ec}
          key={ec.id}
          categories={categories}
          pvIndex={pvIndex}
          ecIndex={index}
          updateExpenseCorrection={updateExpenseCorrection}
          deleteExpenseCorrection={deleteExpenseCorrection}
        />
      ))}
      <IconButton onClick={() => addExpenseCorrection(pvIndex)}>
        <Add />
      </IconButton>
    </div>
  );
};

const ExpenseCorrection = ({
  pvIndex,
  ecIndex,
  expenseCorrection,
  categories,
  updateExpenseCorrection,
  deleteExpenseCorrection
}) => {
  const id = expenseCorrection.id;

  const [amount, setAmount] = useState(
    expenseCorrection.amount ? expenseCorrection.amount : 0.0
  );
  const [category, setCategory] = useState(
    expenseCorrection.category
      ? expenseCorrection.category
      : { id: -1, name: "Select category" }
  );
  const [comment, setComment] = useState(
    expenseCorrection.comment ? expenseCorrection.comment : ""
  );

  const updateAmount = newAmount => {
    setAmount(newAmount);
    updateExpenseCorrection(pvIndex, ecIndex, {
      id,
      amount: newAmount,
      category,
      comment
    });
  };

  const updateCategory = newCategory => {
    setCategory(newCategory);
    updateExpenseCorrection(pvIndex, ecIndex, {
      id,
      amount,
      category: newCategory,
      comment
    });
  };

  const updateComment = newComment => {
    setComment(newComment);
    updateExpenseCorrection(pvIndex, ecIndex, {
      id,
      amount,
      category,
      comment: newComment
    });
  };

  return (
    <div>
      <TextField
        type="number"
        label="Amount"
        value={amount}
        onChange={event => updateAmount(event.target.value)}
      />
      <FormControl>
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          onChange={event => updateCategory(event.target.value)}
        >
          {categories.map(category => (
            <MenuItem value={category} key={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        type="text"
        label="Comment"
        value={comment}
        onChange={event => updateComment(event.target.value)}
      />
      <IconButton
        color="secondary"
        onClick={() => deleteExpenseCorrection(pvIndex, ecIndex)}
      >
        <Delete />
      </IconButton>
    </div>
  );
};

const mapStateToProps = state => ({
  persons: state.persons.data,
  categories: state.categories.data
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addPersonalVariables: () => dispatch(addPersonalVariables()),
  updatePersonalVariables: (index, updatedValue) =>
    dispatch(updatePersonalVariables(index, updatedValue)),
  deletePersonalVariables: index => dispatch(deletePersonalVariables(index)),
  addExpenseCorrection: personalCalculationIndex =>
    dispatch(addExpenseCorrection(personalCalculationIndex)),
  deleteExpenseCorrection: (personalCalculationIndex, expenseCorrectionIndex) =>
    dispatch(
      deleteExpenseCorrection(personalCalculationIndex, expenseCorrectionIndex)
    ),
  updateExpenseCorrection: (
    personalCalculationIndex,
    expenseCorrectionIndex,
    correction
  ) =>
    dispatch(
      updateExpenseCorrection(
        personalCalculationIndex,
        expenseCorrectionIndex,
        correction
      )
    )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalVariablesCard);
