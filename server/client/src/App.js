import React, { Component } from "react";
import "./App.scss";
// keep material ui baseline design?
import CssBaseline from "@material-ui/core/CssBaseline";
import Home from "./components/home/Home";
import { Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Appointments from "./components/appointments/Appointments";
import Practices from "./components/practices/Practices";
import Series from "./components/series/Series";
import NewAppointment from "./components/forms/newAppointment/NewAppointment";
import { AuthProvider } from "./contexts/AuthContext";

//IF USING MATERIAL UI STYLING make sure to export component as export default WithStyles(styles)(App)
export default class App extends Component {
  state = {
    user: this.props.user
  };

  setUser = user => {
    console.log(user);
    this.setState({ user });
  };

  render() {
    return (
      <div className="App">
        <AuthProvider value={{ user: this.state.user, setUser: this.setUser }}>
          <Route exact path="/" component={Home} />
          <>
            <Navbar />
            <Switch>
              {/* Signup and Login only available if no user is logged in */}
              <Route
                exact
                path="/auth/signup"
                render={props => {
                  if (!this.state.user) return <Signup {...props} />;
                  else return <Redirect to="/dashboard" />;
                }}
              />
              <Route
                exact
                path="/auth/login"
                render={props => {
                  if (!this.state.user) return <Login {...props} />;
                  else return <Redirect to="/dashboard" />;
                }}
              />
              {/* These routes are only avialable if a user is logged in */}
              <Route
                exact
                path="/dashboard"
                render={props => {
                  if (this.state.user) return <Dashboard {...props} />;
                  else return <Redirect to="/" />;
                }}
              />
              <Route
                exact
                path="/appointments"
                render={props => {
                  if (this.state.user) return <Appointments {...props} />;
                  else return <Redirect to="/" />;
                }}
              />
              <Route
                exact
                path="/appointment/new"
                render={props => {
                  if (this.state.user) return <NewAppointment {...props} />;
                  else return <Redirect to="/" />;
                }}
              />
              {/* <Route
                exact
                path="/appointment/:id"
                render={props => {
                  if (this.state.user) return <Appointment {...props} />;
                  else return <Redirect to="/" />;
                }}
              /> */}
              <Route
                exact
                path="/practices"
                render={props => {
                  if (this.state.user) return <Practices {...props} />;
                  else return <Redirect to="/" />;
                }}
              />
              <Route
                exact
                path="/series"
                render={props => {
                  if (this.state.user) return <Series {...props} />;
                  else return <Redirect to="/" />;
                }}
              />
            </Switch>
          </>
        </AuthProvider>
      </div>
    );
  }
}
//IF USING MATERIAL UI STYLING make sure to export component as export default WithStyles(styles)(App)
