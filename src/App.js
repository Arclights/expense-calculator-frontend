import React from "react";
import { CssBaseline, Container, makeStyles } from "@material-ui/core";
import "./App.css";
import NavBar from "components/navbar";
import SideBar from "components/sidebar";
import ListExpenses from "pages/ListExpenses";

const useStyles = makeStyles(theme => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  }
}));

function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <CssBaseline />
      <NavBar />
      <SideBar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <ListExpenses />
        </Container>
      </main>
    </div>
  );
}

export default App;
