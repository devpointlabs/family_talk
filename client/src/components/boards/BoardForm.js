import React, { useState, useEffect } from "react"
import { Form, Button } from "semantic-ui-react"
import Dropzone from 'react-dropzone';
import axios from "axios"
import UserBoardForm from "../userBoard/UserBoardForm";
import { AuthConsumer } from "../../providers/AuthProvider";

const BoardForm = (props) => {
  const [name, setName] = useState('')
  const [des, setDes] = useState('')
    
  const board = { name: name, description: des, user_id: props.auth.user.id }
  
  useEffect(() => {
    if (props.id) {
      setName(props.name)
      setDes(props.description)
    }
  },[])

  const userBoard = {user_id: props.auth.user.id, board_id: props.id}

  const createUserBoard = (userBoard) => {
    debugger;
    axios.post(`/api/user_boards`, {user_id: props.auth.user.id, board_id: userBoard.id})
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

      <Button>Create</Button>
      </Form>
  )  
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

