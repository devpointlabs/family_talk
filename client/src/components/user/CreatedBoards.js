import React, { useState, useEffect } from "react"
import axios from "axios"
import BoardForm from "../boards/BoardForm"
import Board from "../boards/Board"
import { Link } from "react-router-dom"
import { Button } from "semantic-ui-react"

import { AuthConsumer } from "../../providers/AuthProvider"

const CreatedBoards = (props) => {
  const [boards, setBoards] = useState([])
  const [showForm, setShowForm] = useState(false)
  
  useEffect(() => {
    axios.get(`/api/user/boards`)
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

  const editBoard = (id, board) => { //we pass the id from our state, add board from form
    let data = new FormData()
    data.append('file', board.file)
    // debugger
    axios.put(`/api/boards/${id}?name=${board.name}&description=${board.description}&public=${board.public}`, data)
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

export default CreatedBoards; 