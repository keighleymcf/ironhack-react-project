import styled from "styled-components";


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

export {HomeDiv, Title, Button, Tile}