import React, { useState, useEffect } from "react"
import { Form, Button } from "semantic-ui-react"
import axios from "axios"

const BoardForm = (props) => {
  const [name, setName] = useState('')
  const [des, setDes] = useState('')
    
  const board = { name: name, description: des }
  
  useEffect(() => {
    if (props.id) {
      setName(props.name)
      setDes(props.des)
    }
  },[])

  function handleSubmit(e) {
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
      <Button>Create</Button>
      </Form>
  )  
}

export default BoardForm