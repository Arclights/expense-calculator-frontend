import React, { useState } from "react";
import { connect } from "react-redux";
import {
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Select,
  IconButton
} from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";
import {
  deletePersonalVariables,
  updatePersonalVariables,
  addExpenseCorrection
} from "./../actions";
import ExpenseCorrection from "./ExpenseCorrection";

const PersonalVariables = ({
  pvIndex,
  personalCalculation,
  persons,
  addExpenseCorrection,
  deletePersonalVariables,
  updatePersonalVariables
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
          pvIndex={pvIndex}
          ecIndex={index}
        />
      ))}
      <IconButton onClick={() => addExpenseCorrection(pvIndex)}>
        <Add />
      </IconButton>
    </div>
  );
};

const mapStateToProps = state => ({
  persons: state.persons.data
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  updatePersonalVariables: (index, updatedValue) =>
    dispatch(updatePersonalVariables(index, updatedValue)),
  deletePersonalVariables: index => dispatch(deletePersonalVariables(index)),
  addExpenseCorrection: personalCalculationIndex =>
    dispatch(addExpenseCorrection(personalCalculationIndex))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalVariables);
