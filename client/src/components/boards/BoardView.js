import React, { useState, useEffect } from "react"
import axios from "axios"
import Posts from "../boardPosts/Posts"
import { BoardConsumer } from "../../providers/BoardProvider"
import BoardForm from "./BoardForm"

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

  return(
    <div>
      <h1>{board.name}</h1>
      <p>{board.description}</p>
      {showForm && <BoardForm />}
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close Form" : "Edit"}
      </button>
        
      <Posts boardId={props.match.params.id}/>
    </div>
    
  )
}

const ConnectedBoardView = (props) => {
  return (
  <BoardConsumer>
    {board => (<BoardView {...props} board={board} />)}
  </BoardConsumer>
  )
}

export default ConnectedBoardView;