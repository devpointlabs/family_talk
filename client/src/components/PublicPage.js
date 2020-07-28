import React, { useState, useEffect } from "react"
import axios from 'axios'
import PublicBoard from './boards/PublicBoard'
import Board from './boards/Board'
import { Button, Dropdown } from "semantic-ui-react"
import AddBoard from "./user/AddBoard"
import AddPost from "./userPosts/AddPost"

const PublicPage = () => {
  const [pubBoards, setPubBoards] = useState([])

  useEffect(() => {
    axios.get(`/api/boards`)
    .then(res => {
      setPubBoards(res.data.filter(board => board.public == true))
    })
    .catch(badRes => {
      console.log(badRes)
    })
  }, [])

  const renderPublicBoards = () => {
    return pubBoards.map(board => (
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
    data.append('file', board.file)
    axios.put(`/api/boards/${id}?name=${board.name}&description=${board.description}&public=${board.public}`, data)
      .then(res => {
        const updateBoard = pubBoards.map(board => {
          if (board.id === id) 
            return res.data 
          return board 
        })
        setPubBoards(updateBoard) 
      })
  }

    const removeBoard = (id) => {
    axios.delete(`/api/boards/${id}`)
      .then((res) => {
      setPubBoards(pubBoards.filter(board => board.id !== id))
    })
  }

  const renderPubBoards = () => {
    return (
      pubBoards.map(board => (
        <>
       
        <PublicBoard 
          key = {board.id}
          name = {board.name}
          description = {board.description}
          image = {board.image}
          id = {board.id}
        />
        </>
      ))
    )
  }

  return (
    <div>
      <h1 className="Header">Explore</h1>
      <div className="AddStuff">
    <Dropdown icon="pencil" >
        <Dropdown.Menu>
            <Dropdown.Item><AddBoard /></Dropdown.Item>
            <Dropdown.Item><AddPost /></Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown> 
    </div>
      {renderPublicBoards()}
    </div>
  )
}

export default PublicPage;