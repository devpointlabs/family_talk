import React, {useState, useEffect} from "react"
import { Form, Button } from "semantic-ui-react"
import axios from "axios"

const PostForm = (props) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  //we need an image as well
  
  useEffect(() => {
    if (props.post) {
      setTitle(props.post.title)
      setDescription(props.post.description)
    } 
  },[])

  const handleSubmit = (e) => {
    const thePost = { title: title, description: description, user_id: props.userId.id }
    if (props.editPost) {
      props.editPost(props.post.id, thePost)
      props.toggleEdit()
    }
    else {
      e.preventDefault()
      axios.post(`/api/boards/${props.boardId}/posts`, thePost) //whenver we do a post we have to pass in two arguments, the path and the object so it knows what we are passing through to that route
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

      <Button> {props.editing ? 'Update' :  'Create'}</Button>

      </Form>
    </div>
  )
}

export default PostForm
