import React, { useState, useEffect } from "react"
import {AuthConsumer} from "../../providers/AuthProvider"
import Axios from "axios"
import Post from "./Post"
import { Image, Card, Icon, Header } from "semantic-ui-react"
import PostForm from "./PostForm"


const Posts = (props) => {
  const [posts, setPosts] = useState([])
  const [showForm, setShowForm] = useState(false)


  useEffect(() => {
    Axios.get(`/api/boards/${props.boardId}/posts`)
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
      <Post key={post.id} post={post} editPost={editPost} removePost={removePost} userId={props.auth.user}/>
    ))
  }

  const addPost = (post) => setPosts([post, ...posts]) //we get the post from PostForm as res.data to pass to the state

  const editPost = (id, post) => {
    Axios.put(`/api/boards/${props.boardId}/posts/${id}`, post)
      .then(res => {
        const updatePost = posts.map(p => {
          if (p.id === id)
            return res.data
          return p;
        })
        setPosts(updatePost)
      })
  }

  const removePost = (id) => {
    Axios.delete(`/api/boards/${props.boardId}/posts/${id}`)
      .then(res => {
      setPosts(posts.filter(post => post.id !== id))
    })
  }

  return (
    <>
      <h2>Posts</h2>
      {/* we pass the addPost and boardId function to the PostForm */}
      {showForm && <PostForm addPost={addPost} boardId={props.boardId} userId={props.auth.user} />} 
    
       <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close Form" : "Add Post"}
      </button>
      <br/>
      <br/>

      {renderPosts()}
    </>
  )
}


const ConnectedPosts = (props) => (
  <AuthConsumer>
    { auth => 
      <Posts { ...props } auth={auth} />
    }
  </AuthConsumer>
)
export default ConnectedPosts;
