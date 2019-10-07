import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import axios from "axios";
import { Typography, Button, Card, CardContent } from "@material-ui/core";

export default class Appointments extends Component {
  static contextType = AuthContext;

  state = {
    appointments: []
  };

  componentDidMount() {
    axios.get("/appointments").then(response => {
      this.setState({ appointments: response.data });
      console.log(response.data);
    });
  }

  render() {
    return (
      <div>
        <div>
          <h1>My Appointments</h1>
        </div>
        <Link to="/appointment/new">
          <Button>make new appt</Button>
        </Link>
        <div>
          {[...this.state.appointments].map(appointment => {
            return (
              <Card>
                <CardContent>
                  <Typography>{appointment.type}</Typography>
                  <Typography>{appointment.date}</Typography>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }
}
