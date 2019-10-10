import React, { Component } from "react";
import { Typography } from "@material-ui/core";

export default class SeriesSubform extends Component {
  render() {
    return (
      <div>
        <Typography>Save this appointment?</Typography>
        {/* <Typography>{this.props.formContext.state.name}</Typography>
            <Typography>{this.props.formContext.state.date}</Typography> */}
      </div>
    );
  }
}
