import React, { useState, useEffect } from "react"
import axios from "axios"
import BoardForm from "./BoardForm"
import Board from "./Board"

const Boards = (props) => {
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
          unfollowBoard={unfollowBoard}
        />
       </>
    ))
  }

  const unfollowBoard = (boardId) => {
    axios.delete(`/api/user_boards/unfollow/${boardId}`)
    .then((res) => {
      console.log("unfollowed")
    }).catch((err) => {
      console.log("fail!")
    })
  }

  const editBoard = (id, board) => { 
    let data = new FormData()
    data.append('file', board.image)
    axios.put(`/api/boards/${id}?name=${board.name}&description=${board.description}&public=${board.public}`, data)
      .then(res => {
        const updateBoard = boards.map(board => {
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

