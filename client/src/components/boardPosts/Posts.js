import React, { useState, useEffect } from "react"
import {AuthConsumer} from "../../providers/AuthProvider"
import axios from "axios"
import Post from "./Post"
import PostForm from "./PostForm"
import "./Posts.css"
import addIcon from '../../images/plus.png'

const defaultimage = "https://simpleicon.com/wp-content/uploads/picture.png"

const Posts = (props) => {
  const [posts, setPosts] = useState([])
  const [showForm, setShowForm] = useState(false)


  useEffect(() => {
    axios.get(`/api/boards/${props.boardId}/posts`) 
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

  const addPost = (post) => setPosts([post, ...posts])

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

  const removePost = (id) => {
    axios.delete(`/api/boards/${props.boardId}/posts/${id}`)
      .then(res => {
      setPosts(posts.filter(post => post.id !== id))
    })
  }

  return (
    <div>
      {showForm && <PostForm addPost={addPost} boardId={props.boardId} userId={props.auth.user} />} 
      <div className="add-container">
        {showForm ? 
            <button onClick={() => setShowForm(!showForm)}>"Close Form"</button> : 
            <img src={addIcon} className="small-icon" onClick={() => setShowForm(!showForm)}/>
        }
      </div>
      <br/>
      <br/>
      <div className="card-grid">
        {renderPosts()}
      </div>
    </div>
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
