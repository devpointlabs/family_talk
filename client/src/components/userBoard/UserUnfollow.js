import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Button } from 'semantic-ui-react'

const UserUnfollow = (props) => {
  const [userBoard, setUserboard] = useState({})

    const removeUserBoard = (id) => {
       axios.delete(`/api/user_boards/${id}`)
       .then((res) => {
          console.log("Unfollow")
       }).catch((err) => {
           console.log("Still followed")
       })

    }

    const getUserBoardId = () => {
        axios.get()
    }


    return(
        <div>
            <Button onClick = {() => removeUserBoard()}>Unfollow</Button>
        </div>
    )






}



