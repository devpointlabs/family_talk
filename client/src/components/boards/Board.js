import React, { useState, } from "react";
import { Link, } from "react-router-dom"
import { Button } from "semantic-ui-react";
import BoardForm from "./BoardForm";

const Board = (props) => {
  const [ editing, setEditing] = useState(false)

  return ( 
    <>
      <div>
        <h1>{props.name}</h1>
        <p>{props.description}</p>
      </div>
      <br/>
      <button onClick={() => setEditing(!editing)}>{editing ? "Close Edit" : "Edit"}</button>
        {/*if editing is true then display form else null  */}
      {editing ? <BoardForm toggleEdit={setEditing} editBook={props.editBook} {...props}/> : null } 
    </>
  )
};



export default Board;