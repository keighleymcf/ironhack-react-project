import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default class Dashboard extends Component {
  DashTile = styled.div`
    padding: 2.5%;

    border: 3px solid #80d0c7;
    border-radius: 10px;
    margin-bottom: 15px;
    img {
      width: 100%;
      border-radius: 10px;
    }
  `;
  DashH2 = styled.h2`
    font-size: 1.5rem;
    text-align: center;
  `;

  render() {
    return (
      <div>
        <this.DashTile>
          <img
            src="/michael-browning-D0ov97Td-xM-unsplash.jpg"
            alt="My Appointments"
          />
          <this.DashH2>My Appointments</this.DashH2>
        </this.DashTile>
        <this.DashTile>
          <img src="/ibrahim-boran-pV5arhEZHiA-unsplash.jpg" alt="My Series" />

          <this.DashH2>My Appointment Series</this.DashH2>
        </this.DashTile>
        <this.DashTile>
          <img src="/luis-melendez-Pd4lRfKo16U-unsplash.jpg" alt="My Doctors" />

          <this.DashH2>My Doctors</this.DashH2>
        </this.DashTile>
      </div>
    );
  }
}
