import React, { useState, useEffect } from "react"
import { Image, Button, Card, Header } from "semantic-ui-react"
import PostForm from "./PostForm"
import Comments from '../comments/Comments'
import axios from "axios"
import CommentsForm from "../comments/CommentsForm"
import { AuthConsumer } from "../../providers/AuthProvider"


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

  return(
    <div>
       <Card key={card.id}>
         <Image src={card.image}/>
         <Header> {card.title}</Header>
         <p>{card.description}</p>
         <h4>Likes: {postLikes ? postLikes.length : "0"}</h4>
        {like ? <button onClick={() => unlikePost(card.id)}>Unlike</button> : <button onClick={() => likePost(card.id)}>Like</button>}
        <h3>Comments</h3>
        <Comments postId = {props.match.params.id} />
        <Button onClick={props.history.goBack}>Go Back</Button>

        {props.auth.user.id === card.user_id ? 
        <div>
        <button onClick={() => setEditing(!editing)}>{editing ? "Close Edit" : "Edit"}</button>
        <button onClick={() => props.removePost(props.id)}>Delete</button> </div> : null }


        {editing ? <PostForm toggleEdit={setEditing} editPost={props.editPost} post={props.post} userId={props.userId}/> : null } 
      </Card>
      <br/>
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

export default ConnectedPostView