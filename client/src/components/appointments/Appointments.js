import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Appointments.styles.scss";
import AuthContext from "../../contexts/AuthContext";
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
  IconButton
} from "@material-ui/core";
import { format } from "date-fns";
import MoreVertIcon from "@material-ui/icons/MoreVert";

export default class Appointments extends Component {
  static contextType = AuthContext;

  state = {
    appointments: [],
    showDialog: false,
    anchorEl: null,
    appointmentToDelete: ""
  };

  formatDate = date => {
    return format(date, "EEEE d MMM Y | K:mm");
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

  showDeleteDialog = appointment => {
    this.setState({
      showDialog: true,
      appointmentToDelete: appointment
    });
  };

  hideDeleteDialog = () => {
    this.setState({
      showDialog: false,
      appointmentToDelete: ""
    });
  };

  handleDelete = () => {
    this.handleClose();
    axios.delete(`/appointments/${this.state.appointmentToDelete}`).then(() => {
      this.hideDeleteDialog();
      this.getAppointments();
    });
  };

  getAppointments = () => {
    console.log("ghost axios in appointmentS");
    axios.get("/appointments").then(response => {
      console.log(response.data);

      let appointments = response.data.map(appointment => {
        let date = appointment.date;
        if (typeof date === "string") {
          date = new Date(appointment.date);
        }
        const formattedDate = this.formatDate(date);
        return { ...appointment, date: formattedDate };
      });
      this.setState({ appointments: appointments });
    });
  };

  componentDidMount() {
    this.getAppointments();
  }

  render() {
    console.log(this.state);
    return (
      <div className="appointments">
        <div>
          <h1>My Appointments</h1>
        </div>
        <Link to="/appointments/new">
          <Button className="btn">Make new appointment</Button>
        </Link>
        <div>
          {this.state.appointments.map(appointment => {
            return (
              <Card key={appointment._id}>
                <CardContent>
                  <div className="appointmentCard">
                    <div>
                      <h4 className="apptH4">{appointment.type}</h4>
                      <h4>{appointment.date}</h4>
                    </div>
                    <div>
                      <IconButton
                        // className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                        id={`menu-anchor-${appointment._id}`}
                        onClick={this.handleMenuClick}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id={`menu-${appointment._id}`}
                        anchorEl={this.state.anchorEl}
                        keepMounted
                        open={Boolean(
                          this.state.anchorEl &&
                            this.state.anchorEl.id.includes(appointment._id)
                        )}
                        onClose={this.handleClose}
                      >
                        <MenuItem>
                          <Link to={`/appointments/${appointment._id}`}>
                            View appointment details for {appointment.type}
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <Link to={`/appointments/edit/${appointment._id}`}>
                            Edit appointment
                          </Link>
                        </MenuItem>
                        <MenuItem
                          className="dlt"
                          onClick={() => {
                            this.showDeleteDialog(appointment._id);
                          }}
                        >
                          Delete appointment
                        </MenuItem>
                      </Menu>
                    </div>{" "}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
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
