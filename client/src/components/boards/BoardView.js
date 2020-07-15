import React, { useState, useEffect } from "react"
import axios from "axios"
import Posts from "../boardPosts/Posts"

const BoardView = (props) => {
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
      <Posts boardId={props.match.params.id}/>
    </div>
    
  )
}

export default BoardView;