import React, { useState, useEffect } from "react"
import {AuthConsumer} from "../../providers/AuthProvider"
import axios from "axios"
import Post from "./Post"
import PostForm from "./PostForm"
import "./Posts.css"
import addIcon from '../../images/plus.png'

const Posts = (props) => {
  const [posts, setPosts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [follows, setFollows] = useState([])
  const [followBoard, setFollowBoard] = useState(false)


  useEffect(() => {
    axios.get(`/api/boards/${props.boardId}/posts`) 
      .then(res => {
        setPosts(res.data)
        getFollows() 
        followed()
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

  const getFollows = () => {
    axios.get(`/api/user/user_boards`)
    .then((res) => {
      setFollows(res.data);
    })
  }

  const addPost = (post) => setPosts([post, ...posts])

  const editPost = (id, post) => {
    let data = new FormData()
    data.append('file', post.image)
    axios.put(`/api/users/${post.user_id}/posts/${post.id}?title=${post.title}&description=${post.description}&board_id=${post.board_id}`, data)
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

const followed = () => {
  follows.map((f) => {
    if(f.board_id === props.boardId) {
      setFollowBoard(true)
    } else {
      setFollowBoard(false)
    }
  })
}
  // if ((props.following) || (props.auth.user.id === props.userId)) {
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
  //  }
  //   else {
  //   return(
  //   <div className="card-grid">
  //   {renderPosts()}
  //   </div>
  //   )}

}


const ConnectedPosts = (props) => (
  <AuthConsumer>
    { auth => 
      <Posts { ...props } auth={auth} />
    }
  </AuthConsumer>
)
export default ConnectedPosts;
