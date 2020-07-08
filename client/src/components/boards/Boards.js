import React, { useState, useEffect } from "react"
import axios from "axios"
import BoardForm from "./BoardForm"
import Board from "./Board"
import { Link } from "react-router-dom"
import { Button } from "semantic-ui-react"
import BoardView from "./BoardView"

const Boards = () => {
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

  const addBoard = (board) => {
    setBoards([board, ...boards])
  }
 
  const removeBoard = (id) => {
    axios.delete(`/api/boards/${id}`)
      .then((res) => {
      setBoards(boards.filter(board => board.id !== id))
    })
  }
  
  const renderBoards = () => {
    return boards.map(board => (
      <>
        <Board
          key={board.id}
          {...board}
          editBoard={editBoard}
          removeBoard={removeBoard}
        />
       </>
    ))
  }

  const editBoard = (id, board) => { //we pass the id from our state, add board from form
    axios.put(`/api/boards/${id}`, board)
      .then(res => {
        const updateBoard = boards.map(board => {
          if (board.id === id) //if the board.id matches the id that we clicked on then.. 
            return res.data //return the data that was updated
          return board //else just return the board as is
        })
        setBoards(updateBoard) //we then push the updated board to our state
      })
  }
  

  return (
    <>
      {showForm && <BoardForm addBoard={addBoard} toggleForm={setShowForm} />}
      <br/>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close Form" : "Add Board"}
      </button>
      <br/>


      {renderBoards()}
    </>
  )
}

export default Boards;