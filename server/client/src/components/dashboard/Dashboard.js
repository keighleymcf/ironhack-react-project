import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { DashTile, DashH2 } from "./Dashboard.styles"

export default class Dashboard extends Component {

  render() {
    return (
      <div>
        <DashTile>
          <img
            src="/michael-browning-D0ov97Td-xM-unsplash.jpg"
            alt="My Appointments"
          />
          <DashH2>My Appointments</DashH2>
        </DashTile>
        <DashTile>
          <img src="/ibrahim-boran-pV5arhEZHiA-unsplash.jpg" alt="My Series" />

          <DashH2>My Appointment Series</DashH2>
        </DashTile>
        <DashTile>
          <img src="/luis-melendez-Pd4lRfKo16U-unsplash.jpg" alt="My Doctors" />

          <DashH2>My Doctors</DashH2>
        </DashTile>
      </div>
    );
  }
}
