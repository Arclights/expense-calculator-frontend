import { makeStyles } from "@material-ui/core";

const styling = theme => ({
  saveIcon: {
    marginRight: theme.spacing(1)
  },
  saveButton:{
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
});

export default makeStyles(styling);
