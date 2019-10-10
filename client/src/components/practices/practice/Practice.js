import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../contexts/AuthContext";
import axios from "axios";
import {
  Typography,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";

export default class Practice extends Component {
  static contextType = AuthContext;

  state = {
    practice: "",
    showRemoveDialog: false,
    showAddDialog: false,
    practiceToRemove: "",
    practiceToAdd: ""
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
    axios
      .put(`/practices/removeOwner/${this.state.practiceToRemove}`)
      .then(() => {
        this.hideRemoveDialog();
        this.getPractice();
      });
  };

  handleAdd = () => {
    axios.put(`/practices/addOwner/${this.state.practiceToRemove}`)
    .then(() => {
      this.hideAddDialog();
      this.getPractice();
    });
  };

  getPractice = () => {
    axios.get(`/practices/${this.props.match.params.id}`).then(response => {
      console.log(response.data)
      let practice = response.data;
      this.setState({
        practice
      });
    });
  };

  checkOwnerList = practice => {
    if (practice) {
    const ownerIds = practice.owner.map(id => {
      return id.toString();
    });
    return ownerIds.includes(this.context.user._id.toString()) ? true : false;
  };}

  componentDidMount() {
    this.getPractice();
  }

  render() {
    console.log(this.state.practice)
    return (
      <div>
        <div>
          <h1>Practice Details</h1>
        </div>
        <div>
          {this.state.practice !== "" && (
          <Card key={this.state.practice._id}>
            <CardContent>
              <div>
                <Typography>{this.state.practice.name}</Typography>
                <Typography>{this.state.practice.type}</Typography>
                {this.checkOwnerList(this.state.practice) && (
                  <Typography>Saved in My Practices</Typography>
                )}
              </div>
              <div>
                <Link to={`/practices/edit/${this.state.practice._id}`}>
                  <Button>Edit practice</Button>
                </Link>
                {this.checkOwnerList(this.state.practice) ? (
                  <Button
                    onClick={() => {
                      console.log(this.state.practice._id);
                      this.showRemoveDialog(this.state.practice._id);
                    }}
                  >
                    Remove practice from my list
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      console.log(this.state.practice._id);
                      this.showAddDialog(this.state.practice._id);
                    }}
                  >
                    Add practice to my list
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>) }
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
