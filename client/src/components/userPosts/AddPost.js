import React, { useState, useEffect } from 'react';
import { AuthConsumer } from "../../providers/AuthProvider";
import axios from 'axios';
import { Redirect, withRouter } from 'react-router-dom';
import { BoardConsumer } from '../../providers/BoardProvider';


const AddPost = (props) => {
  const [toggleForm, setToggleForm] = useState(false)
  const [boards, setBoards] = useState([])
  const [boardChoice, setBoardChoice] = useState()
  const [title, setTitle] = useState('')
  const [description, setDecription] = useState('')
  // const [image, setImage] = useState('') 

  useEffect(() => {
    axios.get('/api/boards')
      .then(res => {
      setBoards(res.data)
    })
  }, [])

  const toggle = () => {
    setToggleForm(!toggleForm)
  }

  // handleChange

  const theBoards = () => {
    return (
      boards.map(b => (
        <option value={b.id}> {b.name}</option>
      ))
    )
  }

  // const addPost = () => {

  // }

  const handleSubmit= (e) => {
    const thePost = { title: title, description: description, board_id: boardChoice }
    e.preventDefault()
    props.board.getBoard(boardChoice)
    axios.post(`/api/users/${props.auth.user.id}/posts`, thePost)
    .then( res => {
      debugger;
      // window.location.href=`/Post/${res.data.id}`
      props.history.push(`/board/${boardChoice}/post/${res.data.id}`)
    
    })
    .catch ( err => {
      debugger;
      console.log("error")
    })
  }

  
   

  // <Redirect to={"/search/" + this.state.name} />

  // automatically redirect user to newly created post within the chosen board
  // link_to situation? 

  return (
    <div>
      <button onClick={toggle}>Add Post?</button>
      {toggleForm ? (
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            label="Title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input 
            name="description" 
            label="Description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDecription(e.target.value)}

          />
          {/* <input 
            name="image" 
            label="Image"
            placeholder="Image"
            value={image}
          /> */}
            
          <select
            value={boardChoice}
            onChange={(e) => setBoardChoice(e.target.value)}
          >
            <option>Boards...</option>
            {theBoards()}
          </select>
          <button type="submit" >submit</button>
        </form>
      ) : null}
    </div>
  );
}

const ConnectedAddPosts = (props) => (
  <AuthConsumer>
      {auth => (
        <BoardConsumer>
          {board => (
            <AddPost {...props} auth={auth} board={board} />
          )}
          </BoardConsumer>
      )}
    </AuthConsumer>
);
export default withRouter(ConnectedAddPosts);

