import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  List,
  ListItem,
  ListItemText,
  Fab,
  makeStyles
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { getExpensesList, openCreateExpenseModal } from "actions";
import CreateExpenseModal from "components/createExpenseModal";

const useStyles = makeStyles(theme => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

function ListExpenses({ getExpenseListings, openModal, expenses }) {
  const classes = useStyles();

  useEffect(() => {
    getExpenseListings();
  }, [getExpenseListings]);

  return (
    <div>
      <h2>Expenses</h2>
      <List>
        {expenses.map(expense => (
          <ListItem key={`${expense.year}/${expense.month}`}>
            {console.log(expense)}
            <ListItemText primary={`${expense.year}/${expense.month}`} />
          </ListItem>
        ))}
      </List>
      <Fab
        className={classes.fab}
        color="primary"
        arial-label="Add"
        onClick={openModal}
      >
        <Add />
      </Fab>
      <CreateExpenseModal />
    </div>
  );
}

const mapStateToProps = state => ({
  expenses: state.expenseListing ? state.expenseListing.expenses : []
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getExpenseListings: () => dispatch(getExpensesList()),
  openModal: () => dispatch(openCreateExpenseModal())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListExpenses);
