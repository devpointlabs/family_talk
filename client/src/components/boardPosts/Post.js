import React, { useState, useEffect } from "react"
import {Link} from 'react-router-dom'
import axios from "axios"
import { AuthConsumer } from "../../providers/AuthProvider"
import "./Posts.css"

const defaultImage = 'https://simpleicon.com/wp-content/uploads/picture.png';

const Post = (props) => {
  const [editing, setEditing] = useState(false)
  const [like, setLike] = useState({})
  const [postLikes, setPostLikes] = useState('')

  useEffect(() => {
    findLike(props.post.id)
    renderLikes(props.post.id)
  }, [])

  const findLike = (id) => {
    axios.get(`/api/users/${props.userId}/users/likes/${id}`)
      .then((res) => {
        setLike(res.data)
      }).catch((err) => {
        console.log(err)
      })
  }

  const likePost = (postId) => {
    axios.post(`/api/users/${props.userId}/likes`, { post_id: postId, user_id: props.userId })
      .then(res => {
        setLike(res.data)
        renderLikes(postId)
      }).catch((err) => {
        console.log(err)
      })
  }

  const unlikePost = (postId) => {
    axios.delete(`/api/users/${props.userId}/users/likes/${postId}`)
      .then(res => {
        setLike(null)
        renderLikes(postId)
        console.log(res.data)
      })
  }

  const renderLikes = (postId) => {
    axios.get(`/api/likes/${postId}`)
      .then((res) => {
        setPostLikes(res.data)
      })
}
  return(
      <Link to={{
          pathname: `/board/${props.post.board_id}/post/${props.post.id}`, showProps: { ...props },
          findLike: {findLike},
          likePost:  {likePost},
          unlikePost:  {unlikePost},
          renderLikes:  {renderLikes},
        }}
         >
        <div className="card">
         <img className = "card-image" src={props.post.image ? props.post.image : defaultImage}/>
          <div className="card-text">
            <p> {props.post.title}</p>
            <p>Likes: {postLikes ? postLikes.length : "0"}</p>
          </div>
        </div>
      </Link>
  )
}

const ConnectedPost = (props) => (
  <AuthConsumer>
    { auth => 
      <Post { ...props } auth={auth} />
    }
  </AuthConsumer>
)
export default ConnectedPost;
