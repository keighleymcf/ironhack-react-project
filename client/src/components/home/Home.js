import React from "react";
import AuthContext from "../../contexts/AuthContext";
import "./Home.styles.scss";
import { Link } from "react-router-dom";
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
            <button className="home-btn">Sign up</button>
          </Link>
          <Link to="/auth/login">
            <button className="home-btn">Log in</button>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="button-container">
          <Link to="/dashboard">
            <button className="home-btn">My Dashboard</button>
          </Link>
          <br />
          <button className="home-btn" onClick={this.handleLogout}>
            Log out
          </button>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <div className="landing-wrapper">
          <div className="landing parallax">
            <h2 className="logo-top">AppointerMed</h2>
            <div>
              <h1 className="title">
                Never forget another doctor's appointment
              </h1>
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
            <h2 className="mission">
              An app that takes the hassle out of tracking medical appointments
            </h2>
          </div>
          <div className="home-card">
            <img
              className="home-icon"
              src="/calendar-icon.png"
              alt="calendar icon"
            />
            <h2>
              Keep track of appointments and store contact details for all your
              doctors in one place
            </h2>
          </div>
          <div className="skew">
            <h3>Future features</h3>
          </div>
          <div className="home-card coming-soon">
            <img
              className="home-icon"
              src="/reminder-icon.png"
              alt="calendar icon"
            />
            <h2 className="coming-soon">
              Track recurring appointments and set reminders, so the app does
              the thinking for you
            </h2>
          </div>
          <div className="home-card coming-soon">
            <img
              className="home-icon safety"
              src="/safety-icon.png"
              alt="calendar icon"
            />
            <h2 className="coming-soon">
              Encrypted data storage ensures your sensitive information is safe
            </h2>
          </div>
        </div>
        </div>

      </div>
    );
  }
}

export default Home;
