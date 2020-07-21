import React, { useState, useEffect } from "react"
import { Form, Button, Radio } from "semantic-ui-react"
import Dropzone from 'react-dropzone';
import axios from "axios"
import UserBoardForm from "../userBoard/UserBoardForm";
import { AuthConsumer } from "../../providers/AuthProvider";

const BoardForm = (props) => {
  const [name, setName] = useState('')
  const [des, setDes] = useState('')
  const [file, setFile] = useState('')
  const [pub, setPub] = useState(false)
  
  const board = { 
    name: name, 
    description: des, 
    user_id: props.auth.user.id, 
    file: file,
    public: pub
  }
  
  useEffect(() => {
    if (props.id) {
      setName(props.name)
      setDes(props.description)
      setPub(props.public ? props.public : false)
    }

  },[])

  const handleDrop = (file) => {
    // debugger
    setFile(file[0]) //ask harlan about this [0]
  }

  const createUserBoard = (board) => {
    axios.post(`/api/user_boards`, {user_id: props.auth.user.id, board_id: board.id})
    .then((res)=>  {
     console.log('success')
     console.log(res.data)
    }).catch((err) =>  {
       console.log("failure")
    })}

  const randomCode = () => {
    return Math.floor(Math.random() * 1000000)
  }
 
  const handleSubmit = (e) => {
    e.preventDefault()
    if (props.editBoard) {
      props.editBoard(props.id, board)
      props.toggleEdit()
    } else {  
       board.code = randomCode()
       axios.post("/api/boards", board)
      .then((res) => {
        props.addBoard(res.data)
        createUserBoard(res.data);
         props.toggleForm();
      })
      .catch((e) => {
        console.log(e)
      })
      setName('')
      setDes('')
      setPub(false)
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

      <Form.Radio 
          toggle 
          label="Public"
          name="public"
          value={pub}
          checked={pub}
          onChange={(e) => setPub(!pub)}
      />
      <br/>
      <Button>Submit</Button>
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

export default function ConnectedBoardForm (props) {
    return (
      <AuthConsumer>
        { auth => 
          <BoardForm { ...props } auth={auth} />
        }
      </AuthConsumer>
    )
}


