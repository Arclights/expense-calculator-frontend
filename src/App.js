import React from "react";
import { CssBaseline } from "@material-ui/core";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "components/navbar";
import SideBar from "components/sidebar";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <NavBar />
      <SideBar />
    </div>
  );
}

export default App;
