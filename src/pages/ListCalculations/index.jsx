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
import { getCalculationsList, openCreateCalculationModal } from "actions";
import CreateCalculationModal from "components/createCalculationModal";
import styles from "./styling";
import history from "../../history";

function ListCalculations({ getCalculationListings, openModal, calculations }) {
  const classes = makeStyles(styles)();

  useEffect(() => {
    getCalculationListings();
  }, [getCalculationListings]);

  console.log(calculations);
  return (
    <div>
      <h2>Calculations</h2>
      <List>
        {calculations.map(calculation => (
          <ListItem
            button
            key={`${calculation.year}/${calculation.month}`}
            onClick={() =>
              history.push(`/expense/${calculation.year}/${calculation.month}`)
            }
          >
            <ListItemText
              primary={`${calculation.year}/${calculation.month}`}
            />
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
      <CreateCalculationModal />
    </div>
  );
}

const mapStateToProps = state => ({
  calculations: state.calculationListings.data
    ? state.calculationListings.data
    : []
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getCalculationListings: () => dispatch(getCalculationsList()),
  openModal: () => dispatch(openCreateCalculationModal())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListCalculations);
