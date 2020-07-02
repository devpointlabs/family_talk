import React from 'react';
import { Header, } from 'semantic-ui-react';
import Board from "../boards/Board"

const Home = () => (
  <>
    <Header as="h3" textAlign="center">Devise Auth App</Header>
    <Board />
  </>
)

export default Home;