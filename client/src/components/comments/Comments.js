import React, {useEffect, useState} from 'react'
import axios from 'axios'

function Comments(){
    const [comments, setComments] = setState([])
     
    useEffect(() => {
      getComments();
    }, [])

  
    async function getComments(){
    let res = await axios.post(`/api/boards/:board_id/posts/:post_id/comments`)
    }
  
  
  
    return(



  )

}






















export default Comments;