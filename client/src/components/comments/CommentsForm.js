import React, { useState, useEffect } from "react"
import { Form, Button } from "semantic-ui-react"
import axios from "axios"
import { withRouter } from "react-router-dom"
import { AuthConsumer } from "../../providers/AuthProvider"

const CommentsForm = (props) => {
  const [des, setDes] = useState('')

  const comment = { description: des, user_id: props.auth.user.id }

//   useEffect(() => {
//     if (props.comment) {
//       setDescription(props.post.description)
//     } 
//   },[])
    
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

  
  // const handleSubmit = (e) => {
  //   // e.preventDefault()
  //      axios.post(`/api/posts/${props.postId}/comments`, comment)
  //     .then((res) => {
  //       props.addComment(res.data)
  //       //  props.toggleForm();
  //     })
  //     .catch((e) => {
  //       console.log(e)
  //     })
    
  //     setDes('')
  //   }
  

  return (
      <>
      <Form onSubmit={handleSubmit}>
      <Form.Input
          label="Description"
        //   name="description"
          placeholder="Description"
          value={des}
          onChange={(e) => setDes(e.target.value)}
          required
      />
      <Button>Create</Button>
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