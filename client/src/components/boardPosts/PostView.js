import React, { useState, useEffect } from "react"
import { Image, Button, Card, Header } from "semantic-ui-react"
import PostForm from "./PostForm"
import Comments from '../comments/Comments'
import axios from "axios"
import { AuthConsumer } from "../../providers/AuthProvider"
import { withRouter } from "react-router-dom"
import "./PostView.css"
import editIcon from '../../images/edit.png'
import trashIcon from '../../images/trash.png'
import likeIcon from '../../images/like.png'


const defaultImage = 'https://simpleicon.com/wp-content/uploads/picture.png';

const PostView = (props) => {  
  const [ editing, setEditing] = useState(false)
  const [card, setCard] = useState({})
  const [like, setLike] = useState(false)
  const [postLikes, setPostLikes] = useState('')

  useEffect(() => {
    getCard();
    findLike(props.match.params.id);
    renderLikes(props.match.params.id);
  }, [])

  async function getCard(){
    let res = await axios.get(`/api/boards/${props.match.params.board_id}/posts/${props.match.params.id}`)
    setCard(res.data);
  }
  
   const findLike = (id) => {
    axios.get(`/api/users/${props.auth.user.id}/users/likes/${id}`)
      .then((res) => {
        setLike(res.data)
      }).catch((err) => {
      console.log(err)
    })
   }
  
  const renderLikes = (postId) => {
    axios.get(`/api/likes/${postId}`)
      .then((res) => {
        setPostLikes(res.data)
      })
}

const likePost = (postId) => {
  axios.post(`/api/users/${props.userId}/likes`, { post_id: postId, user_id: props.auth.user.id })
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

  const editSinglePost = (id, post) => {
    let data = new FormData()
    data.append('file', post.image)
    axios.put(`/api/users/${post.user_id}/posts/${id}?title=${post.title}&description=${post.description}&board_id=${post.board_id}`, data)
      .then((res) => {
      setCard(res.data)
    })
  }

  const deletePost = (id) => {
    axios.delete(`/api/boards/${card.board_id}/posts/${id}`)
      .then(res => {
        props.history.push(`/board/${card.board_id}`)
    })
  }

  return(
    <div className = "container">
      <div className="post-image-container">
        <Image className = "post-image" src={card.image || defaultImage}/>
      </div>
      <div className="post-info">
         {props.auth.user.id === card.user_id ? 
        <div>
          <img className="small-icon" src={editIcon} onClick={() => setEditing(!editing)}/>
          <img className="small-icon" src={trashIcon} onClick={() => deletePost(card.id)}/> </div>: null }

          {editing ? <PostForm toggleEdit={setEditing} post={card} editSinglePost={editSinglePost} editing={editing}  userId={props.userId}/> : null } 
          
      <h1 className="post-title"> {card.title}</h1>
      <p className="post-description">{card.description}</p>
      <div className = "like-container">
        {like ? <button className = "like-button" onClick={() => 
          unlikePost(card.id)}>Unlike</button> : 
          <button className="like-button" onClick={() => likePost(card.id)}><img className="small-icon" src={likeIcon}/>Like</button>}
        <h4>Likes: {postLikes ? postLikes.length : "0"}</h4>
      </div>
      <h3>Comments</h3>
      <Comments postId = {props.match.params.id} />
      <Button onClick={props.history.goBack}>Go Back</Button>
    </div>
    </div>
  )
}

const ConnectedPostView = (props) => {
  return (
    <AuthConsumer>
      {auth => (<PostView {...props} auth={auth} />)}
    </AuthConsumer>
      )
}

export default withRouter(ConnectedPostView)