import React, {useState, useEffect} from "react"
import { Form, Button } from "semantic-ui-react"
import axios from "axios"
import Dropzone from 'react-dropzone';
import { AuthConsumer } from "../../providers/AuthProvider";
import { withRouter } from "react-router-dom";

const PostForm = (props) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState('')
  
  useEffect(() => {
    if (props.post) {
      setTitle(props.post.title)
      setDescription(props.post.description)
      setFile(props.post.image)
    } 
  }, [])

  const handleDrop = (file) => {
    setFile(file[0])
  }

  const handleSubmit = (e) => {
    const thePost = { 
      title: title, 
      description: description, 
      user_id: props.auth.user.id
    }
    if (props.editPost) {
      props.editPost(props.post.id, thePost)
      props.toggleEdit(!props.editing)
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

      <Button> {props.editing ? 'Update' :  'Create'}</Button>
        <Dropzone
            onDrop={handleDrop}
            multiple={false}
          >
            {({ getRootProps, getInputProps, isDragActive }) => {
              return (
                <div
                  {...getRootProps()}
                  style={styles.dropzone}
                >
                  <input {...getInputProps()} />
                 {
                    isDragActive ?
                      <p>Drop files here...</p> :
                      <p>Try dropping some files here, or click to select files to upload.</p>
                  }
                </div>
              )
            }}
      </Dropzone>
      <Button> {props.editing ? 'Update' :  'Add Post'}</Button>

      </Form>
    </div>
  )
}

const styles = {
  dropzone: {
    height: "150px",
    width: "150px",
    border: "1px dashed black",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
  },
}


const ConnectedPostForm = (props) => (
  <AuthConsumer>
    { auth => 
      <PostForm { ...props } auth={auth} />
    }
  </AuthConsumer>
)

export default withRouter(ConnectedPostForm)
