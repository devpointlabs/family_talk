import React, {useEffect, useState} from 'react'
import axios from 'axios'

function Comments(props){
    const [comments, setComments] = useState([])
     
    useEffect(() => {
      getComments();
    }, [])

  
    async function getComments(){
       
    let res = await axios.get(`/api/posts/${props.postId}/comments`)
    setComments(res.data)
    }
  
  
  
    return(
        <div>
            {comments.map((c) => (
                <>
                <hr/>
                <p>{c.description}</p>
                </>
         
            ))}

        </div>



  )

}






















export default Comments;