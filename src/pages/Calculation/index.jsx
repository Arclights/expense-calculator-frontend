import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllData } from "../../actions";
import styling from "./styling";
import { Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import Expenses from "../../components/Expenses";
import PersonalVariablesCard from "../../components/PersonalVariablesCard";

const Calculation = ({ getAllData, year, month, calculation }) => {
  const classes = styling();
  useEffect(() => getAllData(year, month), [getAllData, year, month]);

  return (
    <div>
      <h2>
        Calculation for {year}/{month}
      </h2>
      <Expenses
        expenses={calculation ? calculation.expenses : []}
        classes={classes}
      />
      {calculation && (
        <PersonalVariablesCard
          personalCalculations={calculation.personalCalculations}
        />
      )}
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

const mapStateToProps = state => ({
  calculation: state.calculation.data
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getAllData: (year, month) => dispatch(getAllData(year, month))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calculation);
