import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Appointments from "./components/Appointments";
import Practices from "./components/Practices";
import Series from "./components/Series";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Home} />
      <>
        <Navbar />
        <Switch>
          <Route exact path="/auth/signup" component={Signup} />
          <Route exact path="/auth/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/appointments" component={Appointments} />
          <Route exact path="/practices" component={Practices} />
          <Route exact path="/series" component={Series} />
        </Switch>
      </>
    </div>
  );
}

export default App;
