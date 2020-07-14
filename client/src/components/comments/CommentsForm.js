import React, { useState, useEffect } from "react"
import { Form, Button } from "semantic-ui-react"
import axios from "axios"

const CommentsForm = (props) => {
  const [des, setDes] = useState('')

  const comment = { description: des, user_id: props.userId }

  useEffect(() => {
    if (props.commentId) {
      setDes(props.description)
    } 
  },[])
    
  
  const handleSubmit = (e) => {
    // e.preventDefault()
    if (props.editComment) {
        props.editComment(props.commentId, comment)
      } else {
        axios.post(`/api/posts/${props.postId}/comments`, comment)
        .then((res) => {
          props.addComment(res.data)
          //  props.toggleForm();
        })
        .catch((e) => {
          console.log(e)
        })
      
        setDes('')

      }
    }
  

  return (
      <>
      <Form onSubmit={handleSubmit}>
      <Form.Input
          label="Comment"
        //   name="description"
          placeholder="Enter Comment Here"
          value={des}
          onChange={(e) => setDes(e.target.value)}
          required
      />
      <Button>{props.editing ? 'Update' : 'Create'}</Button>
      </Form>
</>
  )  
}

export default CommentsForm