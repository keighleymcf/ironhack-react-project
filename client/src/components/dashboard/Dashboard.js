import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.styles.scss";
import { Card, CardContent } from "@material-ui/core";
import AuthContext from "../../contexts/AuthContext";

export default class Dashboard extends Component {
  static contextType = AuthContext;

  // state = {
  //   user: this.context.user
  // };

  render() {
    return (
      <div>
        <Link to="/appointments">
          <Card>
            <CardContent>
              <img
                src="/michael-browning-D0ov97Td-xM-unsplash.jpg"
                alt="My Appointments"
              />
              <h2>My Appointments</h2>
            </CardContent>
          </Card>
        </Link>
        <Link to="/series">
          <Card>
            <CardContent>
              <img
                src="/ibrahim-boran-pV5arhEZHiA-unsplash.jpg"
                alt="My Series"
              />
              <h3 className="coming">Coming soon!</h3>
              <h2>My Appointment Series</h2>
            </CardContent>
          </Card>
        </Link>
        <Link to="/practices">
          <Card>
            <CardContent>
              <img
                src="/luis-melendez-Pd4lRfKo16U-unsplash.jpg"
                alt="My Doctors"
              />
              <h2>My Doctors</h2>
            </CardContent>
          </Card>
        </Link>
      </div>
    );
  }
}
