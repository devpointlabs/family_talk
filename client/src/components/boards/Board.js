import React, { useState, useEffect, } from "react";
import { Link, } from "react-router-dom"
import { Button, Image } from "semantic-ui-react";
import BoardForm from "./BoardForm";
import axios from 'axios';
import { AuthConsumer } from "../../providers/AuthProvider";

const defaultImage = 'https://simpleicon.com/wp-content/uploads/picture.png';

const Board = (props) => {
  const [ editing, setEditing] = useState(false)
  const [following, setFollowing] = useState(false)

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
    })
  },[])

  // const renderFollow = () => {
  //     follow.map((f) => { 
  //     if (f.board_id === props.id){
  //     setFollowing(true)
  //     } else 
  //     setFollowing(false)
  //   }) 
  // }

  const handleUnfollow = (id) => {
    props.unfollowBoard(id)
    setFollowing(false)
  }

  return ( 
    <>
      <div>
        <h1>{props.name}</h1>
        <p>{props.description}</p>
        <Image src={props.image || defaultImage}/>
      </div>
      <br/>
      {props.auth.user.id === props.user_id ? 
      <div>
      <button onClick={() => setEditing(!editing)}>{editing ? "Close Edit" : "Edit"}</button>
      <button onClick={() => props.removeBoard(props.id)}>Delete</button> 
      </div> : null}
      <Link to={`/board/${props.id}`}
          key={props.id}
          {...props}
          removeBoard={props.removeBoard}
          handleUnfollow={handleUnfollow}
          following={following}>
        <button>View</button>
        </Link>
      {following ? <button onClick={() => handleUnfollow(props.id)}>Unfollow</button> : null}
      {editing ? <BoardForm toggleEdit={setEditing} editBoard={props.editBoard} {...props}/> : null } 
    </>
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

