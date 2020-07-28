import React, { useState, useEffect } from "react"
import axios from "axios"
import Posts from "../boardPosts/Posts"
import BoardForm from "./BoardForm"
import { AuthConsumer, } from "../../providers/AuthProvider";
import { withRouter } from "react-router-dom";
import "../boardPosts/Posts.css"
import editIcon from '../../images/edit.png'
import trashIcon from '../../images/trash.png'




const BoardView = (props) => {
  const [board, setBoard] = useState({})
  const [editing, setEdit] = useState(false)

  useEffect(() => {
    axios.get(`/api/boards/${props.match.params.id}`)
      .then(res => {
      setBoard(res.data)
      // props.board.getBoard(res.data.id)
      })
      .catch((e) => {
      console.log(e)
    })
  }, [])
 
  const removeBoard = (id) => {
    axios.delete(`/api/boards/${id}`)
      .then((res) => {
      props.history.push('/landingPage')
    })
  }

  const editSingleBoard = (id, board) => {
    let data = new FormData()
    data.append('file', board.file)
    axios.put(`/api/boards/${id}?name=${board.name}&description=${board.description}&public=${board.public}`, data)
      .then(res => {
        setBoard(res.data)
        })
  }

 if ((board.user_id === props.auth.user.id)) {
  return(
    <div className="main-container">
      <div className="board-container">
        <h1 className="board-title">{board.name}</h1>
        <p className="board-description">{board.description}</p>
        <br/>
        <p className="board-description">Your board code is: {board.code}</p>
        <p className="board-description">Invite your family and friends!</p>
        {showForm && <BoardForm />}
        <div>
          {showForm ? 
              <button onClick={() => setShowForm(!showForm)}>"Close Form"</button> : 
              <img src={editIcon} className="small-icon" onClick={() => setShowForm(!showForm)}/>
          }
          <img src={trashIcon} className="small-icon" onClick={() => removeBoard(board.id)}/>
        </div>
      </div>
   <Posts boardId={props.match.params.id}/>

 </div>
  )


  // ask harlan why line 65 needs to be different from line 52
} else {
  return(
    <div>
   <h1>{board.name}</h1>
   <p>{board.description}</p>
    {props.location.following ? <button onClick={() => props.location.handleUnfollow(board.id)}>Unfollow</button> : null}
    <button onClick={props.history.goBack}>Go Back</button>
    <Posts boardId={props.match.params.id} userId={board.user_id} following={props.location.following}/>
  </div>
  )
}
}

const ConnectedBoardView = (props) => {
  return (
  <AuthConsumer>
    {auth=> (<BoardView {...props} auth={auth} />)}
  </AuthConsumer>
  )
}

export default withRouter(ConnectedBoardView);