import React, { Component } from "react";
import { Link } from "react-router-dom";
import { TextField, withStyles } from "@material-ui/core";
import signupStyles from "../signup/Signup.styles";
import AuthContext from "../../contexts/AuthContext";
import "../signup/signup.scss";
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
      <div className="signup-login-container">
        <h2 className="heading">Log in</h2>
        <TextField
          id="outlined-email-input"
          label="Email"
          className={classes.textField}
          type="email"
          name="username"
          autoComplete="email"
          required={true}
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
          required={true}
          margin="normal"
          variant="outlined"
          onChange={this.handleChange}
          value={this.state.password}
        />
        {/* insert alert here */}
        <h3>{this.state.message}</h3>
        <button type="submit" onClick={this.handleSubmit}>
          Log in
        </button>
        <p>
          No account yet? <Link to="auth/signup">Sign up</Link>
        </p>
      </div>
    );
  }
}

export default withStyles(signupStyles)(Login);
