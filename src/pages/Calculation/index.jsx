import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getAllData,
  addExpense,
  updateExpense,
  deleteExpense
} from "../../actions";
import styling from "./styling";
import {
  Button,
  Fab,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Select,
  IconButton
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { Add, Delete } from "@material-ui/icons";

const Calculation = ({
  getAllData,
  year,
  month,
  calculation,
  cards,
  addExpense,
  updateExpense
}) => {
  const classes = styling();
  console.log(month);
  useEffect(() => getAllData(year, month), [getAllData, year, month]);

  return (
    <div>
      <h2>
        Calculation for {year}/{month}
      </h2>
      <Expenses
        expenses={calculation ? calculation.expenses : []}
        cards={cards}
        addExpense={addExpense}
        updateExpense={updateExpense}
        classes={classes}
      />
      <Button
        className={classes.saveButton}
        color="primary"
        variant="contained"
        size="large"
      >
        <SaveIcon className={classes.saveIcon} />
        Save
      </Button>
    </div>
  );
};

const Expenses = ({ expenses, cards, addExpense, updateExpense, classes }) => (
  <Paper>
    <h5>Expenses</h5>
    {expenses.map((expense, index) => (
      <Expense
        index={index}
        expense={expense}
        cards={cards}
        classes={classes}
        updateExpense={updateExpense}
        key={`expense_${index}`}
      />
    ))}
    <Fab color="primary" arial-label="Add" onClick={addExpense}>
      <Add />
    </Fab>
  </Paper>
);

const Expense = ({ index, expense, cards, classes, updateExpense }) => {
  const [card, setCard] = useState(
    expense && expense.card
      ? expense.card
      : cards.length > 0
      ? cards[0]
      : { name: "Select a card" }
  );
  const [amount, setAmount] = useState(expense ? expense.amount : 0.0);
  const [comment, setComment] = useState(expense ? expense.comment : undefined);

  useEffect(() => updateExpense(index, card, amount, comment), [
    updateExpense,
    index,
    card,
    amount,
    comment
  ]);

  return (
    <form>
      <FormControl className={classes.textField}>
        <InputLabel>Card</InputLabel>
        <Select value={card} onChange={event => setCard(event.target.value)}>
          {cards.map(card => (
            <MenuItem value={card} key={`${card.name}_${index}`}>
              {card.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        className={classes.textField}
        type="number"
        label="Amount"
        value={amount}
        onChange={event => setAmount(event.target.value)}
      />
      <TextField
        className={classes.textField}
        type="text"
        label="Comment"
        value={comment}
        onChange={event => setComment(event.taget.value)}
      />
      <IconButton color="secondary">
        <Delete />
      </IconButton>
    </form>
  );
};

const mapStateToProps = state => ({
  calculation: state.calculation.data,
  cards: state.cards.data
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getAllData: (year, month) => dispatch(getAllData(year, month)),
  addExpense: () => dispatch(addExpense()),
  updateExpense: (index, card, amount, comment) =>
    dispatch(updateExpense(index, card, amount, comment)),
  deleteExpense: index => dispatch(deleteExpense(index))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calculation);
