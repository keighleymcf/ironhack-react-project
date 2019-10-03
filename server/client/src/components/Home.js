import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Home = () => {
  const HomeDiv = styled.div`
    text-align: left;
    color: black;
  `;

  const Title = styled.h1`
    background: -webkit-linear-gradient(15deg, #1c78ad 0%, #72bbb2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 3.5rem;
  `;

  const Button = styled.button`
    border: 3px solid #72bbb2;
    border-radius: 100px;
    background: transparent;
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
    </HomeDiv>
  );
};

export default Home;
