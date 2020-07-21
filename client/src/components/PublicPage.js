import React, { useState, useEffect } from "react"
import axios from 'axios'
import PublicBoard from './boards/PublicBoard'

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

  const renderPubBoards = () => {
    return (
      pubBoards.map(board => (
        <>
        <PublicBoard 
          key = {board.id}
          name = {board.name}
          description = {board.description}
          image = {board.image}
        />
        </>
      ))
    )
  }

  return (
    <div>
    {renderPubBoards()}
    </div>
  )
}

export default PublicPage;