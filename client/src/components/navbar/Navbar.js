import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import {
  AppBar,
  IconButton,
  Toolbar,
  Button,
  withStyles,
  Menu,
  MenuItem,
  ClickAwayListener
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import navbarStyles from "./Navbar.styles.js";
import { logout } from "../../services/api";
import AuthContext from "../../contexts/AuthContext";

const StyledMenu = withStyles({
  paper: {
    borderRadius: "0px"
  }
})(props => <Menu getContentAnchorEl={null} {...props} />);

class Navbar extends Component {
  static contextType = AuthContext;

  state = {
    anchorEl: null
  };

  handleMenuClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  handleLogout = () => {
    /*   event.preventDefault(); */
    this.handleClose();
    logout().then(() => {
      this.context.setUser(null);
    });
  };

  render() {
    const classes = this.props;
    return (
      <AppBar position="static" style={{ borderBottom: "4px solid #598e89" }}>
        <ClickAwayListener onClickAway={this.handleClose}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={this.handleMenuClick}
            >
              <MenuIcon />
            </IconButton>
            <StyledMenu
              id="customized-menu"
              anchorEl={this.state.anchorEl}
              keepMounted
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleClose}
            >
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={this.handleClose}
              >
                <CloseIcon />
              </IconButton>
              <MenuItem onClick={this.handleClose}>
                <Link to="/">Home</Link>
              </MenuItem>
              <MenuItem onClick={this.handleClose}>
                <Link to="/appointments">My Appointments</Link>
              </MenuItem>
              <MenuItem onClick={this.handleClose}>
                <Link to="/appointments/new">Add an Appointment</Link>
              </MenuItem>
              <MenuItem onClick={this.handleClose}>
                <Link to="/practices">My Practices</Link>
              </MenuItem>
              <MenuItem onClick={this.handleClose}>
                <Link to="/practices/new">Add a Practice</Link>
              </MenuItem>
              <MenuItem onClick={this.handleLogout}>Log out</MenuItem>
            </StyledMenu>
            <p className="navbar-logo">AppointerMed</p>
          </Toolbar>
        </ClickAwayListener>
      </AppBar>
    );
  }
}

export default withStyles(navbarStyles)(Navbar);
