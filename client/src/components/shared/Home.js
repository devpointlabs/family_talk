import React from 'react';
import { Header, } from 'semantic-ui-react';
import Boards from "../boards/Boards"

const Home = () => (
  <>
    <Header as="h3" textAlign="center">Devise Auth App</Header>
    <Boards />
  </>
)

export default Home;