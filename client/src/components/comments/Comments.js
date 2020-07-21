import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Comment from './Comment';
import CommentsForm from './CommentsForm'

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
  

    const renderComments = () => {
        return comments.map(comment => (
          <Comment key={comment.id} comment={comment} editComment={editComment} removeComment={removeComment} addComment = {addComment} />
        ))
      }

    const editComment = (id, comment) => {
        axios.put(`/api/posts/${props.postId}/comments/${id}`, comment)
          .then(res => {
            const updateComment = comments.map(c => {
              if (c.id === id)
                return res.data
              return c;
            })
            setEditing(!editing)
            setComments(updateComment)
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
            {renderComments()}
            <CommentsForm addComment = {addComment} postId = {props.postId} userId = {props.userId}  />
        </div>



  )

}






















export default Comments;