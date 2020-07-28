import React, { useState, useEffect, } from "react";
import { Link, } from "react-router-dom"
import { Button, Image, Modal } from "semantic-ui-react";
import BoardForm from "./BoardForm";
import axios from 'axios';
import { AuthConsumer } from "../../providers/AuthProvider";
import "./BoardStyles.css"
import img from "./small.png"


const defaultImage = img;

const Board = (props) => {
  const [ editing, setEditing] = useState(false)
  const [following, setFollowing] = useState(false)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios.get(`/api/user/${props.auth.user.id}/user_boards`)
    .then((res) => {
      res.data.map((f) => {
        if (f.board_id === props.id) {
          setFollowing(true)
        } else {
          setFollowing(false)
        }
      })
      getPosts(props.id)
    })
  },[])

  const getPosts = (id) => {
    axios.get(`/api/boards/${id}/posts`)
    .then((res) => {
      setPosts(res.data)
    })
  }

  const handleUnfollow = (id) => {
    props.unfollowBoard(id)
    setFollowing(false)
  }

  return ( 
    <div className="board">
        <Link to={{
        pathname:`/board/${props.id}`,
          key: props.id,
          boardProps:{...props},
          removeBoard: props.deleteBoard,
          handleUnfollow: handleUnfollow,
          following: following,
          editing: editing,
          editBoard: props.editBoard,
          toggleEdit: setEditing,
          editSingleBoard: props.editSingleBoard
          }}><div className="image">
            <Image src={props.image || defaultImage}/>    
            </div> 
        </Link>
        <div className="boardTitle">
        <h2>{props.name}</h2>
        <p>{props.description}</p>
        <p className="cards">{posts.length} Cards</p>
        </div>
        <div className="buttons">
      {props.auth.user.id === props.user_id ? 
      <div>
      {/* <button onClick={() => setEditing(!editing)}>{editing ? "Close Edit" : "Edit"}</button> */}
      <Button icon="trash alternate outline" onClick={() => props.removeBoard(props.id)} />
      </div> : null}
      {following  && props.auth.user.id !== props.user_id ? <button onClick={() => handleUnfollow(props.id)}>Unfollow</button> : null}
      {/* {editing ? <BoardForm toggleEdit={setEditing} editBoard={props.editBoard} {...props}/> : null }  */}
      </div>
      </div>
  )
};

const ConnectedBoard = (props) => (
  <AuthConsumer>
    { auth => 
      <Board { ...props } auth={auth} />
    }
  </AuthConsumer>
)
export default ConnectedBoard;

{/* edit with modals!!!
  <br/>
      {props.auth.user.id === props.user_id ? 
      <div>
      <Modal trigger = {<button onClick={() => setEditing(!editing)}>Edit</button>}>
      <BoardForm toggleEdit={setEditing} editBoard={props.editBoard} {...props}/>
    </Modal>
      <Button icon="trash alternate outline" onClick={() => props.removeBoard(props.id)} />
      </div> : null}
      <div className="buttons">
      {following  && props.auth.user.id !== props.user_id ? <button onClick={() => handleUnfollow(props.id)}>Unfollow</button> : null}

      </div>
      </div> */}

