import React, { useState, useEffect } from "react"
import { Form, Button } from "semantic-ui-react"
import Dropzone from 'react-dropzone';
import axios from "axios"

const BoardForm = (props) => {
  const [name, setName] = useState('')
  const [des, setDes] = useState('')
  const [file, setFile] = useState('')
    
  const board = { name: name, description: des, file: file }
  
  useEffect(() => {
    if (props.id) {
      setName(props.name)
      setDes(props.description)
    }
  },[])

  const handleDrop = (file) => {
    // debugger
    setFile(file[0]) //ask harlan about this [0]
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (props.editBoard) {
      props.editBoard(props.id, board)
      props.toggleEdit()
    } else {  
       axios.post("/api/boards", board)
      .then((res) => {
        props.addBoard(res.data)
         props.toggleForm();
      })
      .catch((e) => {
        console.log(e)
      })
      setName('')
      setDes('')
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
        <Form.Input
          label="Name"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
      />

      <Form.Input
          label="Description"
          name="description"
          placeholder="Description"
          value={des}
          onChange={(e) => setDes(e.target.value)}
          required
      />
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

      <Button>Save</Button>
      </Form>
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

export default BoardForm