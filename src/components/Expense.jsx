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
import { Delete } from "@material-ui/icons";
import { updateExpense, deleteExpense } from "../actions";

const Expense = ({
  index,
  expense,
  cards,
  classes,
  updateExpense,
  deleteExpense
}) => {
  const [card, setCard] = useState(
    expense.card ? expense.card : { id: -1, name: "Select a card" }
  );
  const [amount, setAmount] = useState(expense ? expense.amount : 0.0);
  const [comment, setComment] = useState(expense ? expense.comment : undefined);

  const updateCard = newCard => {
    setCard(newCard);
    updateExpense(index, newCard, amount, comment);
  };

  const updateAmount = newAmount => {
    setAmount(newAmount);
    updateExpense(index, card, newAmount, comment);
  };

  const updateComment = newComment => {
    setComment(newComment);
    updateExpense(index, card, amount, newComment);
  };

  return (
    <form>
      <FormControl className={classes.textField}>
        <InputLabel>Card</InputLabel>
        <Select value={card} onChange={event => updateCard(event.target.value)}>
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
        onChange={event => updateAmount(event.target.value)}
      />
      <TextField
        className={classes.textField}
        type="text"
        label="Comment"
        value={comment}
        onChange={event => updateComment(event.taget.value)}
      />
      <IconButton color="secondary" onClick={() => deleteExpense(index)}>
        <Delete />
      </IconButton>
    </form>
  );
};

const mapStateToProps = state => ({
  cards: state.cards.data
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateExpense: (index, card, amount, comment) =>
    dispatch(updateExpense(index, card, amount, comment)),
  deleteExpense: index => dispatch(deleteExpense(index))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Expense);
