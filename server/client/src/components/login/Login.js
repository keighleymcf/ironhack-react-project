import React, { Component } from "react";
import { TextField, withStyles } from "@material-ui/core";
import loginStyles from "./Login.styles";
//LOOK INTO creating siNGLe handlechange function in external file
//import { handleChange } from "../componentScripts/componentScripts";
import AuthContext from "../../contexts/AuthContext";
import { login } from "../../services/api";

class Login extends Component {
  static contextType = AuthContext;

  state = {
    username: "",
    password: "",
    message: ""
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log(this.state[name]);
  };

  handleSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    login(username, password).then(data => {
      if (data.message) {
        this.setState({
          message: data.message,
          username: "",
          password: ""
        });
      } else {
        // successfully signed up
        // update the state for the parent component
        this.context.setUser(data);
        this.props.history.push("/dashboard");
      }
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <h2>Log in</h2>
        <div>
          <TextField
            id="outlined-email-input"
            label="Email"
            className={classes.textField}
            type="email"
            name="username"
            autoComplete="email"
            margin="normal"
            variant="outlined"
            onChange={this.handleChange}
            value={this.state.username}
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            className={classes.textField}
            type="password"
            name="password"
            autoComplete="current-password"
            margin="normal"
            variant="outlined"
            onChange={this.handleChange}
            value={this.state.password}
          />
          {/* insert alert here */}
          <h3>{this.state.message}</h3>
        </div>
        <button type="submit" onClick={this.handleSubmit}>
          Log in
        </button>
      </div>
    );
  }
}

export default withStyles(loginStyles)(Login);
