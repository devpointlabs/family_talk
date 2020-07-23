import React, {useState} from 'react';
import { Header, Button, } from 'semantic-ui-react';
import AddPost from '../userPosts/AddPost'
import CreatedBoards from '../user/CreatedBoards';
import CreatedPosts from '../user/CreatedPosts';
import Boards from '../boards/Boards'

const Home = () => {
 const [view, setView] = useState('Board')
     
  return (
     <>
    <Header as="h3" textAlign="center">Welcome to Family Talk</Header>
      <Button onClick = {() => setView('Board') }>Boards</Button> 
     <Button onClick = {() => setView('Post') }>Posts</Button>
    <AddPost />
    { view === 'Board' ? <CreatedBoards /> : <CreatedPosts /> }
  </>
  )
}

export default Home;