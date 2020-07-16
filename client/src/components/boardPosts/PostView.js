import React, { useState, useEffect } from "react"
import { Image, Button, Card, Header } from "semantic-ui-react"
import PostForm from "./PostForm"
import Comments from '../comments/Comments'
import Axios from "axios"
import CommentsForm from "../comments/CommentsForm"
import { BoardProvider, BoardConsumer } from "../../providers/BoardProvider"
import { AuthConsumer } from "../../providers/AuthProvider"


const PostView = (props) => {  
  const [ editing, setEditing] = useState(false)
  const [card, setCard] = useState({})

  useEffect(() => {

    getCard();
  }, [])

  async function getCard(){
 let res = await Axios.get(`/api/boards/${props.match.params.board_id}/posts/${props.match.params.id}`)
 setCard(res.data);
}

  return(
    <div>
       <Card key={card.id}>
         <Image src={card.image}/>
         <Header> {card.title}</Header>
        <description>{card.description}</description>
        <h3>Comments</h3>
        <Comments postId = {props.match.params.id} />
        <Button onClick={props.history.goBack}>Go Back</Button>
        <button onClick={() => setEditing(!editing)}>{editing ? "Close Edit" : "Edit"}</button>
        <button onClick={() => props.removePost(props.id)}>Delete</button>
    

        {editing ? <PostForm toggleEdit={setEditing} editPost={props.editPost} post={props.post} userId={props.userId}/> : null } 
        

      </Card>

      <br/>
    </div>
  )
}

const ConnectedPostView = (props) => {
  return (
    <AuthConsumer>
      {auth => (
        <BoardConsumer>
          {board => (
            <PostView {...props} auth={auth} board={board} />
          )}
          </BoardConsumer>
      )}
    </AuthConsumer>
      )
}

export default ConnectedPostView