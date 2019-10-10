import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Button,
  withStyles,
  Card,
  CardContent,
  TextField
} from "@material-ui/core";
import AuthContext from "../../../contexts/AuthContext";
import axios from "axios";
//import NewPracticeStyles from "./NewPractice.styles";

export default class NewPractice extends Component {
  static contextType = AuthContext;

  state = {
    type: "",
    name: "",
    street: "",
    city: "",
    zip: "",
    phone: ""
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = () => {
    const { type, name, street, city, zip, phone } = this.state;
    axios.post("/practices", { type, name, street, city, zip, phone });
    this.props.history.push("/practices");
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Typography variant="h1">Add a practice</Typography>
        <Card>
          <CardContent>
            <TextField
              id="outlined-name-input"
              label="Name of practice"
              //className={classes.textField}
              name="name"
              //autoComplete="name"
              margin="normal"
              variant="outlined"
              onChange={this.handleChange}
              value={this.state.name}
            />
            <TextField
              id="outlined-type-input"
              label="Type of practice"
              //className={classes.textField}
              name="type"
              autoComplete="type"
              margin="normal"
              variant="outlined"
              onChange={this.handleChange}
              value={this.state.type}
            />
            <TextField
              id="outlined-street-input"
              label="Street"
              //className={classes.textField}
              name="street"
              //autoComplete="type"
              margin="normal"
              variant="outlined"
              onChange={this.handleChange}
              value={this.state.street}
            />
            <TextField
              id="outlined-city-input"
              label="City"
              //className={classes.textField}
              name="city"
              //autoComplete="city"
              margin="normal"
              variant="outlined"
              onChange={this.handleChange}
              value={this.state.city}
            />
            <TextField
              id="outlined-zip-input"
              label="Zip code"
              //className={classes.textField}
              name="zip"
              // autoComplete="zip"
              margin="normal"
              variant="outlined"
              onChange={this.handleChange}
              value={this.state.zip}
            />
            <TextField
              id="outlined-phone-input"
              label="Phone number"
              //className={classes.textField}
              name="phone"
              //autoComplete="phone"
              margin="normal"
              variant="outlined"
              onChange={this.handleChange}
              value={this.state.phone}
            />
            <Button onClick={this.handleSubmit}>Save</Button>
          </CardContent>
        </Card>
        <Link to="/practices">
          <Button>See all my practices</Button>
        </Link>
      </div>
    );
  }
}

// export default withStyles(NewPracticeStyles)(NewPractice);
