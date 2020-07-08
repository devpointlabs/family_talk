import React, { useState, useEffect } from "react"
import Axios from "axios"
import Post from "./Post"
import { Image, Card, Icon, Header } from "semantic-ui-react"
import PostForm from "./PostForm"


const Posts = ({boardId}) => {
  const [posts, setPosts] = useState([])
  const [showForm, setShowForm] = useState(false)


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

  const addPost = (post) => setPosts([post, ...posts]) //we get the post from PostForm as res.data to pass to the state

  return (
    <>
      <h2>Posts</h2>
      {/* we pass the addPost and boardId function to the PostForm */}
      {showForm && <PostForm addPost={addPost} boardId={boardId} />} 
    
       <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close Form" : "Add Post"}
      </button>
      <br/>
      <br/>

      {renderPosts()}
    </>
  )
}

export default Posts
