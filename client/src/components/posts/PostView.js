import React, { useState, useEffect } from "react"
import { Image, Card, Header } from "semantic-ui-react"
import PostForm from "./PostForm"
import Axios from "axios"



const PostView = (props) => {  
  const [ editing, setEditing] = useState(false)
  const [card, setCard] =useState({})

  useEffect(() => {
   
    getCard();
  }, [])


  async function getCard(){
 let res = await Axios.get(`/api/boards/${props.boardId}/posts/${props.match.params.id}`)
 console.log(res);
}

  return(
    <div>
       <Card key={props.id}>
         <Image src={props.image}/>
         <Header> {props.title}</Header>
        <description>{props.description}</description>
        
        <button onClick={() => setEditing(!editing)}>{editing ? "Close Edit" : "Edit"}</button>
        <button onClick={() => props.removePost(props.id)}>Delete</button>
    

        {editing ? <PostForm toggleEdit={setEditing} editPost={props.editPost} post={props.post} userId={props.userId}/> : null } 
        

      </Card>

      <br/>
    </div>
  )
}

export default PostView