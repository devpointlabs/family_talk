import React, { useState } from "react"
import { Image, Card, Header } from "semantic-ui-react"
import PostForm from "./PostForm"


const Post = (props) => {  
  const [ editing, setEditing] = useState(false)

  return(
    <div>
       <Card key={props.post.id}>
         <Image src={props.post.image}/>
         <Header> {props.post.title}</Header>
        <description>{props.post.description}</description>
        
        <button onClick={() => setEditing(!editing)}>{editing ? "Close Edit" : "Edit"}</button>
        <button onClick={() => props.removePost(props.post.id)}>Delete</button>

        {editing ? <PostForm toggleEdit={setEditing} editPost={props.editPost} post={props.post}/> : null } 
        

      </Card>

      <br/>
    </div>
  )
}

export default Post