import styled from "styled-components";

const DashTile = styled.div`
  padding: 2.5%;

  border: 3px solid #80d0c7;
  border-radius: 10px;
  margin-bottom: 15px;
  img {
    width: 100%;
    height: 200px;
    border-radius: 10px;
    object-fit: contain;
  }
`;
const DashH2 = styled.h2`
  font-size: 1.5rem;
  text-align: center;
`;

export { DashTile, DashH2 };
