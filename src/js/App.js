import React from "react";
import ReactDom from "react-dom";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import Button from "@material-ui/core/Button";

const App = () => (
  <div>
    "hej"
    <Button variant="contained" color="primary">
      Default
    </Button>
  </div>
);

ReactDom.render(<App />, document.getElementById("root"));
