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
      <div className="dashboard">
        <Link to="/appointments">
          <div className="dashcard">
            <img
              src="/michael-browning-D0ov97Td-xM-unsplash.jpg"
              alt="My Appointments"
            />
            <h2>My Appointments</h2>
          </div>
        </Link>
        <Link to="/series">
          <div className="dashcard">
            <div className="skew coming-soon-box">
              <h3>Coming soon</h3>
            </div>
            <div className="inactive-card"> </div>
            <img
              src="/ibrahim-boran-pV5arhEZHiA-unsplash.jpg"
              alt="My Series"
              className="inactive-img"
            />
            <h2 className="inactive">My Appointment Series</h2>
          </div>
        </Link>
        <Link to="/practices">
          <div className="dashcard">
            <img
              src="/luis-melendez-Pd4lRfKo16U-unsplash.jpg"
              alt="My Doctors"
            />
            <h2>My Doctors</h2>
          </div>
        </Link>
      </div>
    );
  }
}
