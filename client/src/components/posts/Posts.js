import React, {useState, useEffect} from 'react'
import  Axios from 'axios'

export default function Posts(props) {
  const [posts, setPosts] = useState([])
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    Axios.get(`api/boards/${props.board_id}/posts`)
      .then(res => {
        setPosts(res.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  function renderPosts() {
  //   return posts.map(post => (
      
  //     <div>
  //       <p>{post.title}</p>
  //       <p>{post.description}</p>
  //     </div>
  //   )
  // )
  return (
    <>
    {posts}
    </>
  )
}

  return (
    <>
    {renderPosts()}
    </>
  )
}