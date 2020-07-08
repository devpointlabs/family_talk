import React, { useState, useEffect } from "react"
import Axios from "axios"
import { Image, Card, Icon  } from "semantic-ui-react"

const Posts = ({boardId}) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    Axios.get(`/api/boards/${boardId}/posts`)
      .then(res => {
        setPosts(res.data)
      })
  }, [])
  
  function renderPosts() {
    return posts.map(post => (
      <Card key={post.id}>
        <h3> {post.title}</h3>
        <p>{post.description}</p>
        <Image src={post.image}/>
      </Card>
    ))
  }

  return (
    <>
      <h2>Posts</h2>
      {renderPosts()}
    </>
  )
}

export default Posts