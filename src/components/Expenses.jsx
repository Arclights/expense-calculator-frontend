import React from "react";
import { connect } from "react-redux";
import { Fab, Paper } from "@material-ui/core";
import Expense from "./Expense";
import { Add } from "@material-ui/icons";
import { addExpense } from "../actions";

const Expenses = ({ expenses, addExpense, classes }) => (
  <Paper>
    <h5>Expenses</h5>
    {expenses.map((expense, index) => (
      <Expense
        index={index}
        expense={expense}
        classes={classes}
        key={`expense_${index}`}
      />
    ))}
    <Fab color="primary" arial-label="Add" onClick={addExpense}>
      <Add />
    </Fab>
  </Paper>
);

const mapStateToProps = state => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addExpense: () => dispatch(addExpense())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Expenses);
