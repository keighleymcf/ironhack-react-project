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
            <Button>Sign up</Button>
          </Link>
          <Link to="/auth/login">
            <Button>Log in</Button>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="button-container">
          <Link to="/dashboard">
            <Button>My Dashboard</Button>
          </Link>
          <br />
          <Button onClick={this.handleLogout}>Log out</Button>
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
          </div>
        </div>
        <div className="tile-containers">
          <Card>
            <CardContent>
              <h2>
                Keep track of appointments and store contact details for all
                your doctors in one place
              </h2>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div className="skew">
                <h3>Coming soon!</h3>
              </div>
              <h2 className="coming-soon">
                Track recurring appointments and set reminders, so the app does
                the thinking for you
              </h2>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div className="skew">
                <h3>Coming soon!</h3>
              </div>

              <h2 class="coming-soon">
                Encrypted data storage ensures your sensitive information is
                safe
              </h2>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

export default Home;
