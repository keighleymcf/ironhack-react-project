import React, { Component } from "react";
import AuthContext from "../../../contexts/AuthContext";
import axios from "axios";
import { Button, TextField, Typography } from "@material-ui/core";

export default class EditPractice extends Component {
  static contextType = AuthContext;

  state = {
    type: "",
    name: "",
    street: "",
    city: "",
    zip: "",
    phone: "",
    _id: ""
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = () => {
    const { type, name, street, city, zip, phone, _id } = this.state;
    axios.put(`/practices/${_id}`, { type, name, street, city, zip, phone });
    this.props.history.push("/practices");
  };

  componentDidMount() {
    axios.get(`/practices/${this.props.match.params.id}`).then(response => {
      let practice = response.data;
      this.setState({
        type: practice.type,
        name: practice.name,
        _id: practice._id,
        phone: practice.phone,
        street: practice.address.street,
        city: practice.address.city,
        zip: practice.address.zip
      });
    });
  }

  render() {
    return (
      <div>
        <Typography>Edit practice</Typography>
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
      </div>
    );
  }
}
