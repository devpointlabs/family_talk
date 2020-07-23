import React, { useState, useEffect } from "react"
import axios from "axios"
import Posts from "../boardPosts/Posts"
import BoardForm from "./BoardForm"
import { AuthConsumer, } from "../../providers/AuthProvider";
import { withRouter } from "react-router-dom";


const BoardView = (props) => {
  const [board, setBoard] = useState({})
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    axios.get(`/api/boards/${props.match.params.id}`)
      .then(res => {
      setBoard(res.data)
      props.board.getBoard(res.data.id)
      })
      .catch((e) => {
      console.log(e)
    })
  }, [])
 
  const removeBoard = (id) => {
    axios.delete(`/api/boards/${id}`)
      .then((res) => {
      props.history.push('/landingPage')
    })
  }

 if ((board.user_id === props.auth.user.id)) {
  return(
    <div>
   <h1>{board.name}</h1>
   <p>{board.description}</p>
   <p>Your board code is: {board.code}
   <br />
   Invite your family and friends!</p>
   {showForm && <BoardForm />}
   <button onClick={() => setShowForm(!showForm)}>
     {showForm ? "Close Form" : "Edit"}
   </button>
   <button onClick={() => removeBoard(board.id)}>Delete</button>
   <Posts boardId={props.match.params.id}/>
 </div>
  )

} else {
  return(
    <div>
    {props.follow ? <button onClick={() => props.handleUnfollow(props.id)}>Unfollow</button> : null}
    <Posts boardId={props.match.params.id}/>
  </div>
  )
}
}

const ConnectedBoardView = (props) => {
  return (
  <AuthConsumer>
    {auth=> (<BoardView {...props} auth={auth} />)}
  </AuthConsumer>
  )
}

export default withRouter(ConnectedBoardView);