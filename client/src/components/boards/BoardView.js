import React, { useState, useEffect } from "react"
import axios from "axios"
import Posts from "../boardPosts/Posts"
import BoardForm from "./BoardForm"
import { AuthConsumer, } from "../../providers/AuthProvider";
import { withRouter } from "react-router-dom";


const BoardView = (props) => {
  const [board, setBoard] = useState({})
  const [editing, setEdit] = useState(false)

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

  const editSingleBoard = (id, board) => {
    let data = new FormData()
    data.append('file', board.file)
    axios.put(`/api/boards/${id}?name=${board.name}&description=${board.description}&public=${board.public}`, data)
      .then(res => {
        setBoard(res.data)
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

   <button onClick={() => setEdit(!editing)}>{editing ? "Close Edit" : "Edit"}</button>
   {editing ? <BoardForm toggleEdit={setEdit} editSingleBoard={editSingleBoard} id={board.id} name={board.name} description={board.description}/> : null }
   <button onClick={() => removeBoard(board.id)}>Delete</button>
   <Posts boardId={props.match.params.id}/>
 </div>
  )

} else {
  return(
    <div>
    {props.location.following ? <button onClick={() => props.location.handleUnfollow(board.id)}>Unfollow</button> : null}
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