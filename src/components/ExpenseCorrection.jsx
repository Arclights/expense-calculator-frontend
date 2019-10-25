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
import { updateExpenseCorrection, deleteExpenseCorrection } from "./../actions";

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
  categories: state.categories.data
});

const mapDispatchToProps = (dispatch, ownProps) => ({
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
)(ExpenseCorrection);
