import React, {useState, useEffect} from "react"
import { Form, Button, FormInput } from "semantic-ui-react"
import Axios from "axios"

const PostForm = (props) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  //we need an image as well

  const thePost = { title: title, description: description, user_id: props.userId }
  
  useEffect(() => {
    if (props.post.id) {
      setTitle(props.post.title)
      setDescription(props.post.description)
    }
  },[])

  function handleSubmit(e) {
    if (props.editPost) {
      props.editPost(props.post.id, thePost)
      props.toggleEdit()
    }
    else {
      e.preventDefault()
      Axios.post(`/api/boards/${props.boardId}/posts`, thePost) //whenver we do a post we have to pass in two arguments, the path and the object so it knows what we are passing through to that route
        .then(res => {
          props.addPost(res.data) //res.data will be used in posts.js as post to add to the state
        })
    }
  }
    
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          label="Title"
          placeholder="Title"
          type="input"
          required
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Form.Input
          label="Description"
          placeholder="Description"
          type="input"
          required
          autoFocus
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* we will need an image as well */}

      <Button>Create</Button>

      </Form>
    </div>
  )
}

export default PostForm
