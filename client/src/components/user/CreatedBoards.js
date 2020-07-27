import React, { useState, useEffect } from "react"
import axios from "axios"
import BoardForm from "../boards/BoardForm"
import Board from "../boards/Board"
import { AuthConsumer } from "../../providers/AuthProvider"

const CreatedBoards = () => {
  const [boards, setBoards] = useState([])
  const [followedBoards, setFollowedBoards] = useState([])
  const [showForm, setShowForm] = useState(false)
  
  useEffect(() => {
    getFollowedBoards()
    axios.get(`/api/user/boards`)
      .then(res => {
      setBoards(res.data, ...boards)
      })
      .catch((e) => {
      console.log(e)
    })

  }, [])

  const getFollowedBoards = () => {
    axios.get(`/api/user/followedBoards`)
    .then((res) => {
      setFollowedBoards(res.data)
    })
  }


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

  const renderFollowedBoards = () => {
    return followedBoards.map(board => (
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
      {renderFollowedBoards()}
    </>
  )
}

export default CreatedBoards; 