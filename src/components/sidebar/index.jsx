import React from "react";
import { connect } from "react-redux";
import {
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { ChevronLeft, Home, CreditCard, People } from "@material-ui/icons";
import styling from "./styling";
import { closeDrawer } from "actions";
import history from "../../history";

const Sidebar = ({ isOpen, closeDrawer }) => {
  const classes = makeStyles(styling)();
  return (
    <Drawer
      variant="permanent"
      open={isOpen}
      classes={{
        paper: clsx(classes.drawerPaper, !isOpen && classes.drawerPaperClose)
      }}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={closeDrawer}>
          <ChevronLeft />
        </IconButton>
      </div>
      <Divider />
      <div>
        <List>
          <ListItem button onClick={() => history.push("/")}>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </List>
      </div>
      <Divider />
      <div>
        <List>
          <ListItem button>
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary="Persons" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <CreditCard />
            </ListItemIcon>
            <ListItemText primary="Cards" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

const mapStateToProp = state => ({
  isOpen: state.drawer.isOpen
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  closeDrawer: () => dispatch(closeDrawer())
});

export default connect(
  mapStateToProp,
  mapDispatchToProps
)(Sidebar);
