import React, { useState } from "react"
import { Form, Button } from "semantic-ui-react"
import axios from "axios"

const BoardForm = ({addBoard}) => {
  const [name, setName] = useState('')
  const [des, setDes] = useState('')
    
  const board = {name: name, description: des}

  function handleSubmit(e) {
    e.preventDefault()
    axios.post("/api/boards", board)
      .then((res) => {
      addBoard(res.data)
      })
      .catch((e) => {
      console.log(e)
    })
    setName('')
    setDes('')
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