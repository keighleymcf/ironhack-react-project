import React, { Component } from "react";
// import "../appointments/Appointments.styles.scss";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import axios from "axios";
import {
  Menu,
  MenuItem,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

export default class Practices extends Component {
  static contextType = AuthContext;

  state = {
    practices: [],
    anchorEl: null,
    showDialog: false,
    practiceToRemove: ""
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

  showRemoveDialog = practice => {
    this.setState({
      showDialog: true,
      practiceToRemove: practice
    });
  };

  hideRemoveDialog = () => {
    this.setState({
      showDialog: false,
      practiceToRemove: ""
    });
  };

  handleRemove = () => {
    this.handleClose();
    axios
      .put(`/practices/removeOwner/${this.state.practiceToRemove}`)
      .then(() => {
        this.hideRemoveDialog();
        this.getPractices();
      });
  };

  getPractices = () => {
    axios.get("/practices/saved").then(response => {
      let practices = response.data;
      this.setState({ practices });
    });
  };

  componentDidMount() {
    this.getPractices();
  }

  render() {
    return (
      <div className="practices">
        <h2 className="heading-in-app">My Practices</h2>
        <Link to="/practices/search">
          <button>Search for a new practice</button>
        </Link>
        {this.state.practices.map(practice => {
          return (
            <div className="practiceCard" key={practice._id}>
              <div>
                <h4 className="apptH4">{practice.name}</h4>
                <h4>{practice.type}</h4>
              </div>
              <div>
                <IconButton
                  // className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                  id={`menu-anchor-${practice._id}`}
                  onClick={this.handleMenuClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id={`menu-${practice._id}`}
                  anchorEl={this.state.anchorEl}
                  keepMounted
                  open={Boolean(
                    this.state.anchorEl &&
                      this.state.anchorEl.id.includes(practice._id)
                  )}
                  onClose={this.handleClose}
                >
                  <MenuItem>
                    <Link to={`/practices/${practice._id}`}>
                      View practice details
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to={`/practices/edit/${practice._id}`}>
                      Edit practice
                    </Link>
                  </MenuItem>
                  <MenuItem
                    className="dlt"
                    onClick={() => {
                      console.log(practice._id);
                      this.showRemoveDialog(practice._id);
                    }}
                  >
                    Remove practice from my list
                  </MenuItem>
                </Menu>
              </div>
            </div>
          );
        })}
        <Dialog open={this.state.showDialog}>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to remove this practice from your list?
            </DialogContentText>
            <DialogActions>
              <button className="cancel-btn" onClick={this.hideRemoveDialog}>
                Cancel
              </button>
              <button  className="delete-btn" onClick={this.handleRemove}>Remove</button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
