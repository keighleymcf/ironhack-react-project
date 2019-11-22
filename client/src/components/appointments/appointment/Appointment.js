import React, { Component } from "react";
import AuthContext from "../../../contexts/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions
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
      showDialog: true
    });
  };

  hideDeleteDialog = () => {
    this.setState({
      showDialog: false
    });
  };

  handleDelete = () => {
    axios.delete(`/appointments/${this.state.appointment._id}`).then(() => {
      this.hideDeleteDialog();
      this.props.history.push("/appointments");
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
    return (
      <div className="indiv-appt-view">
        <h2 className="heading-in-app">Appointment Details</h2>
        <div className="indiv-appt">
          <h4 className="apptH4">{this.state.appointment.type}</h4>
          <h4 className="apptLow">{this.state.appointment.date}</h4>
          <div>
            <Link to={`/appointments/edit/${this.state.appointment._id}`}>
              <button>Edit appointment</button>
            </Link>
            <button className="delete-btn" onClick={this.showDeleteDialog}>
              Delete appointment
            </button>
          </div>
        </div>
        <Dialog open={this.state.showDialog}>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this appointment?
            </DialogContentText>
            <DialogActions>
              <button className="cancel-btn" onClick={this.hideDeleteDialog}>
                Cancel
              </button>
              <button className="delete-btn" onClick={this.handleDelete}>
                Delete
              </button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
