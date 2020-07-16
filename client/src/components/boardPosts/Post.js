import React, { useState } from "react"
import { Image, Card, Header } from "semantic-ui-react"
import PostForm from "./PostForm"
import {Link} from 'react-router-dom'


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
        <Link to={{ pathname:`/board/${props.post.board_id}/post/${props.post.id}`, showProps: {...props}}}
        
         >
        <button>View</button>
        </Link>

        {editing ? <PostForm toggleEdit={setEditing} editPost={props.editPost} post={props.post} userId={props.userId}/> : null } 
        

      </Card>

      <br/>
    </div>
  )
}

export default Post;