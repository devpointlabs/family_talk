import React, { useState, useEffect } from "react"
import axios from "axios"
import BoardForm from "./BoardForm"
import Board from "./Board"
import { Link } from "react-router-dom"
import { Button } from "semantic-ui-react"

export default function Boards() {
  const [boards, setBoards] = useState([])
  const [showForm, setShowForm] = useState(false)

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
 
  function removeBoard(id) {
    axios.delete(`/api/boards/${id}`)
      .then((res) => {
      setBoards(boards.filter(board => board.id !== id))
    })
  }

  // function renderBoards() {
  //   return boards.map(b => (
  //     <div>
  //       <h1>{b.name}</h1>
  //       <p>{b.description}</p>
  //       <button onClick={() => removeBoard(b.id)}>Delete</button>
  //     </div>
  //   ))
  // }

  //delete is doesnt work***********************************************
  function renderBoards() {
    return boards.map(board => (
      <Board
        key={board.id}
        {...board}
        editBoard={editBoard}
        removeBoard={removeBoard}
      />
    ))
  }

  const editBoard = (id, board) => {
    axios.put(`/api/boards/${id}`, board)
      .then(res => {
        const updateBoard = board.map(board => {
          if (board.id === id)
            return res.data
          return board
        })
        setBoards(updateBoard)
      })
  }
  

  return (
    <>
      {showForm && <BoardForm addBoard={addBoard} toggleForm={setShowForm} />}
      <Button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close Form" : "Add Board"}
      </Button>


      {renderBoards()}
    </>
  )
}