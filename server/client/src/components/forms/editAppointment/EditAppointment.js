import React, { Component } from "react";
import AuthContext from "../../../contexts/AuthContext";
import axios from "axios";
import { Button, TextField, Typography } from "@material-ui/core";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export default class EditAppointment extends Component {
  static contextType = AuthContext;

  state = {
    type: "",
    date: "",
    _id: ""
  };

  componentDidMount() {
    axios.get(`/appointments/${this.props.match.params.id}`).then(response => {
      let appointment = response.data;
      let date = appointment.date;
      if (typeof date === "string") {
        date = new Date(appointment.date);
      }
      const updatedAppointment = { ...appointment, date: date };
      this.setState({
        type: updatedAppointment.type,
        date: updatedAppointment.date,
        _id: updatedAppointment._id
      });
    });
  }

  handleChange = event => {
    console.log(event.target);
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleDateChange = date => {
    this.setState({ date });
  };

  handleSubmit = () => {
    const { date, type, _id } = this.state;
    axios.put(`/appointments/${_id}`, { type, date }).then(() => {
      this.props.history.push("/appointments");
    });
  };

  // formatDate = date => {
  //   return format(date, "EEEE d MMM Y | K:mm");
  // };
  render() {
    return (
      <div>
        <Typography>Edit appointment</Typography>
        <TextField
          id="outlined-type-input"
          label="Type of appointment"
          //className={classes.textField}
          type="type"
          name="type"
          autoComplete="type"
          margin="normal"
          variant="outlined"
          onChange={this.handleChange}
          value={this.state.type}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DateTimePicker
            // inputVariant="outlined"
            label="Date and Time"
            ampm={false}
            name="date"
            value={this.state.date}
            onChange={this.handleDateChange}
          />
        </MuiPickersUtilsProvider>
        <Button onClick={this.handleSubmit}>Save</Button>
      </div>
    );
  }
}
