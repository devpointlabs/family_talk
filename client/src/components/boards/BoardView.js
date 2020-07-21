import React, { useState, useEffect } from "react"
import axios from "axios"
import Posts from "../boardPosts/Posts"
import { BoardConsumer } from "../../providers/BoardProvider"
import BoardForm from "./BoardForm"
import { AuthConsumer, } from "../../providers/AuthProvider";


const BoardView = (props) => {
  const [board, setBoard] = useState({})
  const [code, setCode] = useState(false)
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
 
 if (board.user_id === props.auth.user.id){
  return(
    <div>
       {board.code}
      <h1>{board.name}</h1>
      <p>{board.description}</p>
      {showForm && <BoardForm />}
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close Form" : "Edit"}
      </button>
      <Posts boardId={props.match.params.id}/>
    </div>
    
  )
} else {
  return(
    <div>
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

export default ConnectedBoardView;