import React, { useState } from "react"
import { Image, Card, Icon, Header } from "semantic-ui-react"
import PostForm from "./PostForm"


const Post = ({ post, editPost,removePost, userId }) => {  
  const [ editing, setEditing] = useState(false)

  return(
    <div>
       <Card key={post.id}>
         <Image src={post.image}/>
         <Header> {post.title}</Header>
        <description>{post.description}</description>
        
        <button onClick={() => setEditing(!editing)}>{editing ? "Close Edit" : "Edit"}</button>
        <button onClick={() => removePost(post.id)}>Delete</button>

        {editing ? <PostForm toggleEdit={setEditing} editPost={editPost} post={post} userId={userId}/> : null } 
        

      </Card>

      <br/>
    </div>
  )
}

export default Post