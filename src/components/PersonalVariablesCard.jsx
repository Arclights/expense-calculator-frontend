import React from "react";
import { connect } from "react-redux";
import { Fab, Paper } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { addPersonalVariables } from "./../actions";
import PersonalVariables from "./PersonalVariables";

const PersonalVariablesCard = ({
  personalCalculations,
  addPersonalVariables
}) => {
  return (
    <Paper>
      <h5>Personal variables</h5>
      {personalCalculations.map((personalCalculation, index) => (
        <PersonalVariables
          personalCalculation={personalCalculation}
          key={personalCalculation.id}
          pvIndex={index}
        />
      ))}
      <Fab color="primary" arial-label="Add" onClick={addPersonalVariables}>
        <Add />
      </Fab>
    </Paper>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  addPersonalVariables: () => dispatch(addPersonalVariables())
});

export default connect(
  null,
  mapDispatchToProps
)(PersonalVariablesCard);
