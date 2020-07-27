import React from "react"
import { Link, } from "react-router-dom"

const PublicBoard = (props) => {

  return ( 
    <>
      <div>
        <h1>{props.name}</h1>
        <p>{props.description}</p>
        <img src={props.image} />
      </div>
      <br/>
      <Link to={`/board/${props.id}`}
          key={props.id}
          {...props}>
        <button>View</button>
        </Link>
        

    </>
  )
};

export default PublicBoard; 