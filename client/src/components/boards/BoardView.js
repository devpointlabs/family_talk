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
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    axios.get(`/api/boards/${props.match.params.id}`)
      .then(res => {
      setBoard(res.data)
      props.board.getBoard(res.data.id)
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

} else {
  return(
    <div>
    {props.following ? <button onClick={() => props.handleUnfollow(props.id)}>Unfollow</button> : null}
    <Posts boardId={props.match.params.id}/>
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