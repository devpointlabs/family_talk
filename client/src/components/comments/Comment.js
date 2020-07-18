
import React, { useState } from "react"
import {Button} from 'semantic-ui-react'
import CommentsForm from './CommentsForm'

const Comment = (props) => {  
    const [ editing, setEditing] = useState(false)

    function changeEdit(){
        return setEditing(!editing)
    }

return (
<div>
   <hr/>
    <p>{props.comment.description}</p>
     <Button onClick = {() => props.removeComment(props.comment.id)}>Delete</Button>
     <Button onClick = {() => setEditing(!editing)}>Edit</Button>
      {editing && <CommentsForm postId = {props.comment.post_id} userId = {props.comment.user_id} editComment = {props.editComment} 
      editing = {editing} description = {props.comment.description} commentId = {props.comment.id} changeEdit ={changeEdit}/>}
</div>
)
}
              
        

export default Comment;
