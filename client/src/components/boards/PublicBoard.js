import React from "react"
import { Link, } from "react-router-dom"

const PublicBoard = (props) => {

  return ( 
    <>
      <div>
        <h1>{props.name}</h1>
        <p>{props.description}</p>
      </div>
      <br/>
      <Link to={`/board/${props.id}`}
          key={props.id}
          {...props}>
        <button>View</button>
        </Link>
        {/* <button onClick={() => props.unfollowBoard(props.id)}>Unfollow</button> */}

    </>
  )
};

export default PublicBoard;