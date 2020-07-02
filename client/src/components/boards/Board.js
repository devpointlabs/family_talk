import React, { useState, useEffect } from "react"
import axios from "axios"
import BoardForm from "./BoardForm"

export default function Board() {
  const [boards, setBoards] = useState([])

  useEffect(() => {
    axios.get("/api/boards")
      .then(res => {
      setBoards(res.data)
      })
      .catch((e) => {
      console.log(e)
    })
  }, [])

  function addBoard(board) {
    setBoards([board, ...boards])
  }

  function renderBoards() {
    return boards.map(b => (
      <div>
        <h1>{b.name}</h1>
        <p>{b.description}</p>
      </div>
    ))
  }
  

  return (
    <>
      <BoardForm addBoard={addBoard}/>
      {renderBoards()}
    </>
  )
}