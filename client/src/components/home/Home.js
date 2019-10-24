import React from "react";
import AuthContext from "../../contexts/AuthContext";
import "./Home.styles.scss";
import { Button, Card, CardContent } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { logout } from "../../services/api";

class Home extends React.Component {
  static contextType = AuthContext;
  /*  state = {
    user: this.context.user
  }; */

  handleLogout = event => {
    /*   event.preventDefault(); */
    console.log("test");
    logout().then(() => {
      this.context.setUser(null);
    });
  };

  Buttons = () => {
    let user = this.context.user;
    if (!user) {
      return (
        <div className="button-container">
          <Link to="/auth/signup">
            <Button className="home-btn">Sign up</Button>
          </Link>
          <Link to="/auth/login">
            <Button className="home-btn">Log in</Button>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="button-container">
          <Link to="/dashboard">
            <Button className="home-btn">My Dashboard</Button>
          </Link>
          <br />
          <Button className="home-btn" onClick={this.handleLogout}>
            Log out
          </Button>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <div className="landing">
          <div>
            <h1 className="title">Never forget another doctor's appointment</h1>
            <this.Buttons />
            <div className="arrow">
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <div className="tile-containers">
          <div className="home-card">
            <h2 className="logo-text">AppointerMed</h2>
            <h2>
              An app that takes the hassle out of tracking medical appointments
            </h2>
          </div>
          <div className="home-card">
            <h2>
              Keep track of appointments and store contact details for all your
              doctors in one place
            </h2>
          </div>
          <div className="home-card">
            <div className="skew">
              <h3>Coming soon!</h3>
            </div>
            <h2 className="coming-soon">
              Track recurring appointments and set reminders, so the app does
              the thinking for you
            </h2>
          </div>
          <div className="home-card">
            <div className="skew">
              <h3>Coming soon!</h3>
            </div>
            <h2 className="coming-soon">
              Encrypted data storage ensures your sensitive information is safe
            </h2>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
