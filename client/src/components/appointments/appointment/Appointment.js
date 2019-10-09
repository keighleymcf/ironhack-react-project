import React, { Component } from "react";
import AuthContext from "../../../contexts/AuthContext";
import axios from "axios";
import {Link} from "react-router-dom"
import {
  Typography,
  Button,
  Card,
  CardContent,
  Menu,
  MenuItem,
  ClickAwayListener,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton
} from "@material-ui/core";
import { format } from "date-fns";

export default class Appointment extends Component {
  static contextType = AuthContext;

  state = {
    appointment: "",
    showDialog: false
  };
  formatDate = date => {
    return format(date, "EEEE d MMM Y | K:mm");
  };

  showDeleteDialog = () => {
    this.setState({
      showDialog: true,
    });
  };

  hideDeleteDialog = () => {
    this.setState({
      showDialog: false,
    });
  };

  handleDelete = () => {
    axios.delete(`/appointments/${this.state.appointment._id}`).then(() => {
      this.hideDeleteDialog();
      this.props.history.push("/appointments")
    });
  };

  componentDidMount() {
    axios.get(`/appointments/${this.props.match.params.id}`).then(response => {
      let appointment = response.data;
      let date = appointment.date;
      if (typeof date === "string") {
        date = new Date(appointment.date);
      }
      const formattedDate = this.formatDate(date);
      const formattedAppointment = { ...appointment, date: formattedDate };
      this.setState({
        appointment: formattedAppointment
      });
    });
  }

  render() {
    console.log(this.props.match.params);
    return (
      <div>
        <Card>
          <CardContent>
            <Typography>{this.state.appointment.type}</Typography>
            <Typography>{this.state.appointment.date}</Typography>
            <Link to={`/appointments/edit/${this.state.appointment._id}`}><Button>Edit appointment</Button></Link>
            <Button onClick={this.showDeleteDialog}>Delete appointment</Button>
          </CardContent>
        </Card>
        <Dialog open={this.state.showDialog}>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this appointment?
            </DialogContentText>
            <DialogActions>
              <Button onClick={this.hideDeleteDialog}>Cancel</Button>
              <Button onClick={this.handleDelete}>Delete</Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
