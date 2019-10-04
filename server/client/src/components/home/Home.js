import React from "react";
import AuthContext from "../../contexts/AuthContext";
import { HomeDiv, Title, Button, Tile } from "./Home.styles";
import { Link, Redirect } from "react-router-dom";
import { logout } from "../../services/api";

class Home extends React.Component {
  static contextType = AuthContext;
  state = {
    user: this.context.user
  };

  handleLogout = event => {
    event.preventDefault();
    logout().then(() => {
      this.setContext({ user: null });
    });
  };

  Buttons = () => {
    let user = this.state.user;
    if (!user) {
      return (
        <>
          <Link to="/auth/signup">
            <Button>Sign up</Button>
          </Link>
          <Link to="/auth/login">
            <Button>Log in</Button>
          </Link>
        </>
      );
    } else {
      return (
        <>
          <Link to="/dashboard">
            <Button>My Dashboard</Button>
          </Link>
          <br />
          <Button onClick={this.handleLogout}>Log out</Button>
        </>
      );
    }
  };

  render() {
    return (
      <HomeDiv>
        <div>
          <Title>Never forget another doctor's appointment</Title>
          <this.Buttons />
        </div>
        <div>
          <Tile>
            <h2>
              Keep track of individual appointments and series of recurring
              appointments
            </h2>
          </Tile>
          <Tile>
            <h2>Store contact details for all your doctors in one place</h2>
          </Tile>
          <Tile>
            <h2>
              Set reminders to make new appointments and let the app do the
              thinking for you
            </h2>
          </Tile>
          <Tile>
            <h2>
              Encrypted data storage ensures your sensitive information is safe
            </h2>
          </Tile>
        </div>
      </HomeDiv>
    );
  }
}

export default Home;
