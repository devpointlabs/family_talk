import React from 'react';
import { Header, } from 'semantic-ui-react';
import Boards from "../boards/Boards"
import AddPost from '../userPosts/AddPost'

const Home = () => (
  <>
    <Header as="h3" textAlign="center">Welcome to Family Talk</Header>
    <AddPost />
    <Boards />
  </>
)

export default Home;