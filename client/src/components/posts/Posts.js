import React, { useState, useEffect } from "react"
import Axios from "axios"
import Post from "./Post"
import { Image, Card, Icon, Header } from "semantic-ui-react"


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
      // <Card key={post.id}>
      //   <Image src={post.image}/>
      //   <Header> {post.title}</Header>
      //   <description>{post.description}</description>
      // </Card>
      <Post key={post.id} post={post}/>
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