import React, { useState, useEffect } from "react"
import { Form, Button } from "semantic-ui-react"
import axios from "axios"
import { AuthConsumer } from "../../providers/AuthProvider"

const CommentsForm = (props) => {
  const [des, setDes] = useState('')

  const comment = { description: des, user_id: props.auth.user.id, user_name: props.auth.user.name}

  useEffect(() => {
    if (props.commentId) {
      setDes(props.description)
    } 
  },[])

    
const handleSubmit = (e) => {
  // e.preventDefault()
  if (props.editComment) {
      props.editComment(props.commentId, comment)
      props.changeEdit()
    } else {
      axios.post(`/api/posts/${props.postId}/comments`, comment)
      .then((res) => {
        props.addComment(res.data)
        console.log(comment)
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
          placeholder="Enter Comment Here"
          value={des}
          onChange={(e) => setDes(e.target.value)}
          required
      />
       <Button>{props.editing ? 'Update' : 'Add Comment'}</Button>
      </Form>
    </>
  )  
}

const ConnectedCommentsForm = (props) => {
  return (
    <AuthConsumer>
      {auth => (<CommentsForm {...props} auth={auth}/>)}
    </AuthConsumer>
      )
}

export default ConnectedCommentsForm;