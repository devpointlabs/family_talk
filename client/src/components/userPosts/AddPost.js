import React, { useState, useEffect } from 'react';
import { AuthConsumer } from "../../providers/AuthProvider";
import axios from 'axios';
import { Redirect, withRouter } from 'react-router-dom';
import { BoardConsumer } from '../../providers/BoardProvider';
import Dropzone from 'react-dropzone';


const AddPost = (props) => {
  const [toggleForm, setToggleForm] = useState(false)
  const [boards, setBoards] = useState([])
  const [boardChoice, setBoardChoice] = useState()
  const [title, setTitle] = useState('')
  const [description, setDecription] = useState('')
  const [file, setFile] = useState('')

  useEffect(() => {
    axios.get('/api/boards')
      .then(res => {
      setBoards(res.data)
    })
  }, [])

  const toggle = () => {
    setToggleForm(!toggleForm)
  }

  const handleDrop = (file) => {
    setFile(file[0]) 
  }

  const theBoards = () => {
    return (
      boards.map(b => (
        <option value={b.id}> {b.name}</option>
      ))
    )
  }

  const handleSubmit= (e) => {
    const thePost = { title: title, description: description, board_id: boardChoice, image: file }
    e.preventDefault()
    props.board.getBoard(boardChoice)
    axios.post(`/api/users/${props.auth.user.id}/posts`, thePost)
    .then( res => { 
      debugger;
      props.history.push(`/board/${boardChoice}/post/${res.data.id}`)
    })
    .catch ( err => {  
      debugger;
      console.log("error")
    })
  }

  return (
    <div>
      <button onClick={toggle}>Add Post?</button>
      {toggleForm ? (
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            label="Title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input 
            name="description" 
            label="Description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDecription(e.target.value)}
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
            
          <select
            value={boardChoice}
            onChange={(e) => setBoardChoice(e.target.value)}
          >
            <option>Boards...</option>
            {theBoards()}
          </select>
          <button type="submit" >submit</button>
        </form>
      ) : null}
    </div>
  );
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

const ConnectedAddPosts = (props) => (
  <AuthConsumer>
      {auth => (
        <BoardConsumer>
          {board => (
            <AddPost {...props} auth={auth} board={board} />
          )}
          </BoardConsumer>
      )}
    </AuthConsumer>
);
export default withRouter(ConnectedAddPosts);

