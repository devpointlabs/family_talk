import React, { useState, useEffect } from "react"
import axios from "axios"
import Posts from "../posts/Posts"

export default function BoardView(props) {
  const [board, setBoard] = useState({})

  useEffect(() => {
    axios.get(`/api/boards/${props.match.params.id}`)
      .then(res => {
      setBoard(res.data)
      })
      .catch((e) => {
      console.log(e)
    })
  }, [])

  return(
    <div>
      <h1>{board.name}</h1>
        <p>{board.description}</p>
        {/* <button onClick={() => props.removeBoard(props.id)}>Delete</button>
        <button onClick={() => props.editBoard(props.id)}>Edit</button> */}
        <Posts
          board_id = {board.id}
        />
    </div>
    
  )
}