import React, { useState, useEffect } from "react"
import axios from "axios"
import Posts from "../boardPosts/Posts"
import { BoardConsumer } from "../../providers/BoardProvider"

const BoardView = (props) => {
  const [board, setBoard] = useState({})

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