import React, { Component } from "react";
// import "./App.scss";
import { ThemeProvider } from "@material-ui/styles";
import mainTheme from "./App.styles.js";

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
import Appointment from "./components/appointments/appointment/Appointment";
import EditAppointment from "./components/forms/editAppointment/EditAppointment";
import PracticeSearch from "./components/forms/practiceSearch/PracticeSearch";
import Practice from "./components/practices/practice/Practice";
import NewPractice from "./components/forms/newPractice/NewPractice";
import EditPractice from "./components/forms/editPractice/EditPractice";

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
        <ThemeProvider theme={mainTheme}>
          <AuthProvider
            value={{ user: this.state.user, setUser: this.setUser }}
          >
            <Switch>
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
                    path="/appointments/new"
                    render={props => {
                      if (this.state.user) return <NewAppointment {...props} />;
                      else return <Redirect to="/" />;
                    }}
                  />
                  <Route
                    exact
                    path="/appointments/:id"
                    render={props => {
                      if (this.state.user) return <Appointment {...props} />;
                      else return <Redirect to="/" />;
                    }}
                  />
                  <Route
                    exact
                    path="/appointments/edit/:id"
                    render={props => {
                      if (this.state.user)
                        return <EditAppointment {...props} />;
                      else return <Redirect to="/" />;
                    }}
                  />
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
                    path="/practices/search"
                    render={props => {
                      if (this.state.user) return <PracticeSearch {...props} />;
                      else return <Redirect to="/" />;
                    }}
                  />
                  <Route
                    exact
                    path="/practices/new"
                    render={props => {
                      if (this.state.user) return <NewPractice {...props} />;
                      else return <Redirect to="/" />;
                    }}
                  />
                  <Route
                    exact
                    path="/practices/:id"
                    render={props => {
                      if (this.state.user) return <Practice {...props} />;
                      else return <Redirect to="/" />;
                    }}
                  />
                  <Route
                    exact
                    path="/practices/edit/:id"
                    render={props => {
                      if (this.state.user) return <EditPractice {...props} />;
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
            </Switch>
          </AuthProvider>
        </ThemeProvider>
      </div>
    );
  }
}
//IF USING MATERIAL UI STYLING make sure to export component as export default WithStyles(styles)(App)
