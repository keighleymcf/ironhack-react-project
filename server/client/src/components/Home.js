import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Home = () => {
  const HomeDiv = styled.div`
    text-align: left;
    color: black;
    width: 335px;
    div {
    }
  `;

  const Title = styled.h1`
    background: -webkit-linear-gradient(15deg, #1c78ad 0%, #72bbb2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 2.5rem;
    width: 330px;
  `;

  const Button = styled.button`
    border: 3px solid #72bbb2;
    border-radius: 100px;
    background: transparent;
    margin: 30px 10px 30px 0px;
    font-size: 1.1rem;
    padding: 10px 0px;
    width: 110px;
  `;

  const Tile = styled.div`
    width: 95%;
    padding: 2.5%;
    border: 3px solid #80d0c7;
    border-radius: 10px;
    margin-bottom: 15px;
    h2 {
      width: 95%;
    }
  `;

  return (
    <HomeDiv>
      <div>
        <Title>Never forget another doctor's appointment</Title>
        <Link to="/auth/signup">
          <Button>Sign up</Button>
        </Link>
        <Link to="/auth/login">
          <Button>Log in</Button>
        </Link>
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
};

export default Home;
