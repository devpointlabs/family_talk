import React, {useState} from 'react';
import { Button, Dropdown, Modal, } from 'semantic-ui-react';
import AddPost from '../userPosts/AddPost'
import CreatedBoards from '../user/CreatedBoards';
import CreatedPosts from '../user/CreatedPosts';
import './FamilyRoom.css'
import { AuthConsumer } from '../../providers/AuthProvider';
import AddBoard from '../user/AddBoard';
import plus from '../../images/plus.png'

const Home = (props) => {
 const [view, setView] = useState('Board')
     
  return (
     <>
    <h1 className="Header">{props.auth.user.name}'s Family Room</h1>
    <div className="AddStuff">
    <Dropdown icon="pencil" >
        <Dropdown.Menu>
        <Modal size="mini" centered={true} trigger={<Button  color="grey">Add Board or Post</Button>}>
          <Modal.Content>
          <AddBoard />
        <br />
        <br />
           <AddPost />
            </Modal.Content>
          </Modal>
            </Dropdown.Menu>
            </Dropdown> 
    </div>
    <div className="Buttons">
      <Button color= "grey" onClick = {() => setView('Board') }>Boards</Button> 
     <Button color="grey" onClick = {() => setView('Post') }>Posts</Button>
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