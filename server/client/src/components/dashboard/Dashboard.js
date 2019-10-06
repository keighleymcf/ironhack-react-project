import React, { Component } from "react";
import { Link } from "react-router-dom";
import { DashTile, DashH2 } from "./Dashboard.styles";
import AuthContext from "../../contexts/AuthContext";

export default class Dashboard extends Component {
  static contextType = AuthContext;

  state = {
    user: this.context.user
  };

  render() {
    return (
      <div>
        <Link to="/appointments">
          <DashTile>
            <img
              src="/michael-browning-D0ov97Td-xM-unsplash.jpg"
              alt="My Appointments"
            />
            <DashH2>My Appointments</DashH2>
          </DashTile>
        </Link>
        <Link to="/series">
          <DashTile>
            <img
              src="/ibrahim-boran-pV5arhEZHiA-unsplash.jpg"
              alt="My Series"
            />
            <DashH2>My Appointment Series</DashH2>
          </DashTile>
        </Link>
        <Link to="/practices">
          <DashTile>
            <img
              src="/luis-melendez-Pd4lRfKo16U-unsplash.jpg"
              alt="My Doctors"
            />
            <DashH2>My Doctors</DashH2>
          </DashTile>
        </Link>
      </div>
    );
  }
}
