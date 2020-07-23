import React, { useState, useEffect } from "react"
import {AuthConsumer} from "../../providers/AuthProvider"
import axios from "axios"
import Post from "../boardPosts/Post"
import PostForm from "../boardPosts/PostForm"


const CreatedPosts = (props) => {
  const [posts, setPosts] = useState([])
  const [showForm, setShowForm] = useState(false)


  useEffect(() => {
    axios.get(`/api/user/posts`)
      .then(res => {
        setPosts(res.data)
      })
  }, [])
  
  const renderPosts = () => {
    return posts.map(post => (
      <Post
        key={post.id}
        post={post}
        editPost={editPost}
        removePost={removePost}
        userId={props.auth.user.id}
        boardId={props.boardId}
      />
    ))
  }

//  const addPost = (post) => setPosts([post, ...posts])

  const editPost = (id, post) => {
    axios.put(`/api/boards/${props.boardId}/posts/${id}`, post)
      .then(res => {
        const updatePost = posts.map(p => {
          if (p.id === id)
            return res.data
          return p;
        })
        setPosts(updatePost)
      })
  }

  const removePost = (id, boardId) => {
    axios.delete(`/api/boards/${boardId}/posts/${id}`)
      .then(res => {
      setPosts(posts.filter(post => post.id !== id))
    })
  }

  return (
    <>
      <h2>Posts</h2>
      {/* {showForm && <PostForm addPost={addPost} boardId={props.boardId} userId={props.auth.user} />} 
       <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close Form" : "Add Post"}
      </button>
      <br/>
      <br/> */}

      {renderPosts()}
    </>
  )
}

const ConnectedCreatedPosts = (props) => (
  <AuthConsumer>
    { auth => 
      <CreatedPosts { ...props } auth={auth} />
    }
  </AuthConsumer>
)
export default ConnectedCreatedPosts;
