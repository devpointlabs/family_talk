import React, { useState, useEffect } from 'react';
import { AuthConsumer } from "../providers/AuthProvider";
import axios from 'axios';


const AddPost = () => {
  const [toggleForm, setToggleForm] = useState(false)
  const [boards, setBoards] = useState([])
  const [boardChoice, setBoardChoice] = useState()


  useEffect(() => {
    axios.get('/api/boards')
      .then(res => {
      setBoards(res.data)
    })
  }, [])

  const toggle = () => {
    setToggleForm(!toggleForm)
  }

  // handleChange

  //  handleSubmit

  const theBoards = () => {
    return (
      boards.map(b => (
        <option value={b.id}> {b.name}</option>
      ))
    )
  }



  return (
    <div>
      <button onClick={toggle}>Add Post?</button>
      {toggleForm ? (
        <form>
          <input name="title" />
          <input name="description" />
          <input name="image" />
          <select
            value={boardChoice}
            onChange={(e) => setBoardChoice(e.target.value)}
          >
            <option>Boards...</option>
            {theBoards()}
          </select>
        </form>
      ) : null}
    </div>
  );
}

const ConnectedAddPosts = (props) => (
  <AuthConsumer>{(auth) => <AddPost {...props} auth={auth} />}</AuthConsumer>
);
export default ConnectedAddPosts;

