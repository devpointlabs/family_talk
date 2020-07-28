import React, {useState} from 'react';
import { Button, } from 'semantic-ui-react';
import AddPost from '../userPosts/AddPost'
import CreatedBoards from '../user/CreatedBoards';
import CreatedPosts from '../user/CreatedPosts';
import './FamilyRoom.css'
import { AuthConsumer } from '../../providers/AuthProvider';
import AddBoard from '../user/AddBoard';

const Home = (props) => {
 const [view, setView] = useState('Board')
     
  return (
     <>
    <h1 className="Header">{props.auth.user.name}'s Family Room</h1>
    <div className="AddStuff">
    <AddBoard />
    <AddPost />
    </div>
    <div className="Buttons">
      <Button onClick = {() => setView('Board') }>Boards</Button> 
     <Button onClick = {() => setView('Post') }>Posts</Button>
    </div>
<div className="View">
    { view === 'Board' ? <CreatedBoards /> : <CreatedPosts /> }
</div>
  </>
  )
}

const ConnectedHome = (props) => {
  return (
  <AuthConsumer>
    {auth=> (<Home {...props} auth={auth} />)}
  </AuthConsumer>
  )
}

export default ConnectedHome;