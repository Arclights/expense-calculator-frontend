import React from "react";
import { connect } from "react-redux";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import styling from "./styling";
import { openDrawer } from "actions";

const NavBar = ({ drawerIsOpen, openDrawer }) => {
  const classes = makeStyles(styling)();

  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar, drawerIsOpen && classes.appBarShift)}
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

const mapStateToProps = state => ({
  drawerIsOpen: state.drawer.isOpen
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  openDrawer: () => dispatch(openDrawer())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
