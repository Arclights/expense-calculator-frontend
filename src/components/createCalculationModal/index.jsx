import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Modal,
  Fade,
  Backdrop,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Button,
  CircularProgress
} from "@material-ui/core";
import { closeCreateCalculationModal, createCalculation } from "../../actions";
import styling from "./styling";

const useStyles = makeStyles(styling);

const months = [
  {
    value: 1,
    text: "January"
  },
  {
    value: 2,
    text: "February"
  },
  {
    value: 3,
    text: "March"
  },
  {
    value: 4,
    text: "April"
  },
  {
    value: 5,
    text: "May"
  },
  {
    value: 6,
    text: "June"
  },
  {
    value: 7,
    text: "July"
  },
  {
    value: 8,
    text: "August"
  },
  {
    value: 9,
    text: "September"
  },
  {
    value: 10,
    text: "October"
  },
  {
    value: 11,
    text: "Novemeber"
  },
  {
    value: 12,
    text: "December"
  }
];

function CreateCalculationModal({ isOpen, isProcessing, error, close, create }) {
  const classes = useStyles();

  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(new Date().getFullYear());

  console.log("is open: " + isOpen);
  return (
    <Modal
      className={classes.modal}
      open={isOpen}
      onClose={close}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isOpen}>
        <div className={classes.paper}>
          <h2>Create Calculation</h2>
          <p>Input the month and year of the expense</p>
          <form>
            <FormControl className={classes.textField}>
              <InputLabel>Month</InputLabel>
              <Select
                value={month}
                onChange={event => setMonth(event.target.value)}
              >
                {months.map(month => (
                  <MenuItem
                    value={month.value}
                    key={`${month.value}_${month.text}`}
                  >
                    {month.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              className={classes.textField}
              type="number"
              label="Year"
              value={year}
              onChange={event => setYear(event.taget.value)}
            />
          </form>
          {isProcessing ? (
            <CircularProgress />
          ) : (
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={() => create(month, year)}
            >
              Create
            </Button>
          )}
          <p style={{ color: "red" }} hidden={!error}>
            {error}
          </p>
        </div>
      </Fade>
    </Modal>
  );
}

const mapStateToProps = state => ({
  isOpen: state.modal.createCalculation,
  isProcessing: state.createCalculation.isProcessing,
  error: state.createCalculation.error
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  close: () => dispatch(closeCreateCalculationModal()),
  create: (month, year) => dispatch(createCalculation(month, year))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateCalculationModal);
