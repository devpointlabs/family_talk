import React, { useState, useEffect } from "react"
import axios from "axios"
import BoardForm from "./BoardForm"
import { Link } from "react-router-dom"

export default function Boards() {
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
  };

  function removeBoard(id) {
    axios.delete(`/api/boards/${id}`)
      .then((res) => {
      setBoards(boards.filter(board => board.id !== id))
    })
  };

  function editBoard(id, board) {
    axios.put(`/api/boards/${id}`, board)
    .then(res => {
      const updateBoard = boards.map(board => {
        if (board.id === id )
          return res.data; 
        return board
      });
      setBoards(updateBoard)
    })
  };

  function renderBoards() {
    return boards.map(b => (
      <div>
        <h1>{b.name}</h1>
        {/* <p>{b.description}</p>
        <button onClick={() => removeBoard(b.id)}>Delete</button>
        <button onClick={() => editBoard(b.id)}>Edit</button> */}
        <Link to={`/board/${b.id}`}
          key={b.id}
          {...b} 
          removeBoard={removeBoard}
          editBoard={editBoard}>
          <button>View</button>
        </Link>
      </div>
    ))
  };

  return (
    <>
      <BoardForm 
        addBoard={addBoard}/>
      {renderBoards()}
    </>
  )
}