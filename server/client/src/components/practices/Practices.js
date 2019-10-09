import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import axios from "axios";
import { Typography, Button, Card, CardContent } from "@material-ui/core";

export default class Practices extends Component {
  static contextType = AuthContext;

  state = {
    practices: []
  };

  componentDidMount() {
    axios.get("/practices").then(response => {
      this.setState({ practices: response.data });
    });
  }
  render() {
    return (
      <div>
        <div>
          <h1>My Appointments</h1>
        </div>
        <Link to="/practices/new">
          <Button>make new appt</Button>
        </Link>
        <div>
          {[...this.state.appointments].map(appointment => {
            return (
              <Card>
                <CardContent>
                  <div>
                    <Typography>{appointment.type}</Typography>
                    <Typography>{appointment.date}</Typography>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }
}
