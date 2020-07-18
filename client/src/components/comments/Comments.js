import React, {useEffect, useState} from 'react'
import axios from 'axios'
import CommentsForm from './CommentsForm';
import { Button } from 'semantic-ui-react';

function Comments(props){
    const [comments, setComments] = useState([])
    const [editing, setEditing] = useState(false)
     
    useEffect(() => {
      getComments();
    }, [])

   
   function addComment(comment) {
    setComments([comment, ...comments])
   }

    async function getComments(){
       
    let res = await axios.get(`/api/posts/${props.postId}/comments`)
    setComments(res.data)
    }
  

    const editComment = (id, comment) => {
        axios.put(`/api/posts/${props.postId}/comments/${id}`, comment)
          .then(res => {
            const updateComment = comments.map(c => {
              if (c.id === id)
                return res.data
              return c;
            })
            setComments(updateComment)
            setEditing(!editing)
          })
      }
    
  
    const removeComment = (id) => {
        axios.delete(`/api/posts/${props.postId}/comments/${id}`)
          .then(res => {
          setComments(comments.filter(comment => comment.id !== id))
        })
      }
  

    return(
        <div>
            {comments.map((c) => (
                <>
                <hr/>
                <p>{c.description}</p>
                <Button onClick = {() => removeComment(c.id)}>Delete</Button>
                <Button onClick = {() => setEditing(!editing)}>Edit</Button>
                {editing && <CommentsForm postId = {c.postId} userId = {c.userId} editComment = {editComment} 
                editing = {editing} description = {c.description} commentId = {c.id}/>}
                </>
         
            ))}

           <CommentsForm addComment = {addComment} postId = {props.postId} userId = {props.userId}  />

        </div>



  )

}






















export default Comments;