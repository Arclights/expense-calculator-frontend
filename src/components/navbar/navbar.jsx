import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import styling from "./navbar_styling.jsx";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const classes = makeStyles(styling)();

  const openDrawer = () => {
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar, open && classes.appBarShift)}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          arial-label="open drawer"
          onClick={openDrawer}
        >
          <MenuIcon />
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap>
          Expense Calculator
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
