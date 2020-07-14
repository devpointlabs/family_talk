import React, { useState, useEffect } from "react"
import { Image, Button, Card, Header } from "semantic-ui-react"
import PostForm from "./PostForm"
import Comments from '../comments/Comments'
import Axios from "axios"
import CommentsForm from "../comments/CommentsForm"



const PostView = (props) => {  
  const [ editing, setEditing] = useState(false)
  const [card, setCard] =useState({})

  useEffect(() => {
  
    getCard();
  }, [])


  

  async function getCard(){
 let res = await Axios.get(`/api/boards/${props.location.showProps.boardId}/posts/${props.match.params.id}`)
 setCard(res.data);
}

  return(
    <div>
       <Card key={card.id}>
         <Image src={card.image}/>
         <Header> {card.title}</Header>
        <description>{card.description}</description>
        <h3>Comments</h3>
        <Comments postId = {props.match.params.id} userId = {props.location.showProps.userId}/>
        <Button onClick={props.history.goBack}>Go Back</Button>
        <button onClick={() => setEditing(!editing)}>{editing ? "Close Edit" : "Edit"}</button>
        <button onClick={() => props.removePost(props.id)}>Delete</button>
    

        {editing ? <PostForm toggleEdit={setEditing} editPost={props.editPost} post={props.post} userId={props.userId}/> : null } 
        

      </Card>

      <br/>
    </div>
  )
}

export default PostView