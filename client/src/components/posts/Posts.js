import React, { useState, useEffect } from "react"
import Axios from "axios"

const Posts = ({boardId}) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    Axios.get(`/api/boards/${boardId}/posts`)
      .then(res => {
        setPosts(res.data)
      })
  },[])

  return (
    <>
      <h2>Posts</h2>
    </>
  )
}

export default Posts