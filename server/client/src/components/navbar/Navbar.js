import React, { Component } from "react";
import {
  AppBar,
  Typography,
  IconButton,
  Toolbar,
  Button,
  withStyles
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import navbarStyles from "./Navbar.styles.js";
import { logout } from "../../services/api";
import AuthContext from "../../contexts/AuthContext";

class Navbar extends Component {
  static contextType = AuthContext;

  state = {
    user: this.context.user
  };

  handleLogout = event => {
    event.preventDefault();
    logout()
      .then(() => {
        this.context.setUser({ user: null });
      })
      .then(() => {
        this.props.history.push("/");
      });
  };

  render() {
    const classes = this.props;
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            {/* add onclick to show menu options?? */}
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Best app name
          </Typography>
          <Button color="inherit" onClick={this.handleLogout}>
            Log out
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(navbarStyles)(Navbar);
