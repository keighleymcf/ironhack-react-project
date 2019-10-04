import React, { Component } from "react";
import {
  AppBar,
  Typography,
  useScrollTrigger,
  Box,
  Container,
  Slide
} from "@material-ui/core";

export default class Navbar extends Component {
  
  render() {
    return (
        <AppBar>
          <Typography>navbar</Typography>
        </AppBar>
      
    );
  }
}
