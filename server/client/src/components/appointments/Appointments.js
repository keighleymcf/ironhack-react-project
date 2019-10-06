import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

export default class Appointments extends Component {
  static contextType = AuthContext;

  state = {
    user: this.context.user
  };

  render() {
    return (
      <div>
        <div>
          <h1> Add appt list here later</h1>
        </div>
        <Link to="/appointment/new">
          <button>make new appt</button>
        </Link>
      </div>
    );
  }
}
