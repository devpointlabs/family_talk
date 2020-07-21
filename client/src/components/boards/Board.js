import React, { useState, } from "react";
import { Link, } from "react-router-dom"
import { Button, Image } from "semantic-ui-react";
import BoardForm from "./BoardForm";
import axios from 'axios';
import { AuthConsumer } from "../../providers/AuthProvider";

const defaultImage = 'https://simpleicon.com/wp-content/uploads/picture.png';

const Board = (props) => {
  const [ editing, setEditing] = useState(false)

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
          {...props}>
        <button>View</button>
        </Link>
        <button onClick={() => props.unfollowBoard(props.id)}>Unfollow</button>

        {/*if editing is true then display form else null  */}
      {editing ? <BoardForm toggleEdit={setEditing} {...props}/> : null } 
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

