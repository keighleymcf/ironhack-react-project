import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../contexts/AuthContext";
import axios from "axios";
import {
  Typography,
  Button,
  Card,
  CardContent,
  Menu,
  MenuItem,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  TextField
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

export default class PracticeSearch extends Component {
  static contextType = AuthContext;

  state = {
    practices: [],
    anchorEl: null,
    showRemoveDialog: false,
    showAddDialog: false,
    practiceToRemove: "",
    practiceToAdd: "",
    query: ""
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
      showRemoveDialog: true,
      practiceToRemove: practice
    });
  };

  hideRemoveDialog = () => {
    this.setState({
      showRemoveDialog: false,
      practiceToRemove: ""
    });
  };

  showAddDialog = practice => {
    this.setState({
      showAddDialog: true,
      practiceToAdd: practice
    });
  };

  hideAddDialog = () => {
    this.setState({
      showAddDialog: false,
      practiceToAdd: ""
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

  handleAdd = () => {
    this.handleClose();
    axios.put(`/practices/addOwner/${this.state.practiceToRemove}`).then(() => {
      this.hideAddDialog();
      this.getPractices();
    });
  };

  getAllPractices = () => {
    axios.get("/practices").then(response => {
      let practices = response.data;
      this.setState({ practices });
    });
  };

  getPractices = () => {
    const query = this.state.query;
    if (query === "") {
      this.getAllPractices();
    } else {
      axios.get(`/practices/search/${query}`).then(response => {
        let practices = response.data;
        this.setState({ practices });
      });
    }
  };

  onSearch = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    this.getPractices();
  };

  checkOwnerList = practice => {
    const ownerIds = practice.owner.map(id => {
      return id.toString();
    });
    return ownerIds.includes(this.context.user._id.toString()) ? true : false;
  };

  componentDidMount() {
    console.log("COM DID MOUNT");
    this.getPractices();
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <div>
          <h1>Search Practices</h1>
        </div>
        <TextField
          id="outlined-search-input"
          label="Search practices"
          //className={classes.textField}
          type="search"
          name="query"
          //   autoComplete="type"
          margin="normal"
          variant="outlined"
          onChange={this.onSearch}
          value={this.state.query}
        />
        <div>
          <Typography>Can't find your practice?</Typography>
          <Link to="/practices/new">
            <Button>Add new practice</Button>
          </Link>
        </div>
        <div>
          <Typography>Practice results</Typography>
          {this.state.practices.map(practice => {
            return (
              <Card key={practice._id}>
                <CardContent>
                  <div>
                    <Typography>{practice.name}</Typography>
                    <Typography>{practice.type}</Typography>
                    {this.checkOwnerList(practice) && (
                      <Typography>Saved in My Practices"</Typography>
                    )}
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
                      </MenuItem>{" "}
                      ​
                      {this.checkOwnerList(practice) ? (
                        <MenuItem
                          onClick={() => {
                            console.log(practice._id);
                            this.showRemoveDialog(practice._id);
                          }}
                        >
                          Remove practice from my list
                        </MenuItem>
                      ) : (
                        <MenuItem
                          onClick={() => {
                            console.log(practice._id);
                            this.showAddDialog(practice._id);
                          }}
                        >
                          Add practice to my list
                        </MenuItem>
                      )}
                    </Menu>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <Dialog open={this.state.showRemoveDialog}>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to remove this practice from your list?
            </DialogContentText>
            <DialogActions>
              <Button onClick={this.hideRemoveDialog}>Cancel</Button>
              <Button onClick={this.handleRemove}>Remove</Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
        <Dialog open={this.state.showAddDialog}>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to add this practice to your list?
            </DialogContentText>
            <DialogActions>
              <Button onClick={this.hideAddDialog}>Cancel</Button>
              <Button onClick={this.handleAdd}>Add</Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
