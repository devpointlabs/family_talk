import React, { useEffect, useState } from 'react';
import axios from 'axios'

const AllPosts = () => {
  const [posts, setPosts] = useState([])


  useEffect(() => {
    axios.get('/api/posts')
      .then(res => {
      setPosts(res.data)
    })
  }, [])

  const renderPosts = () => {
    return (
      posts.map(p => (
        <div>{p.title}
        <div>User id - {p.user_id}</div>
          <div>Board id - {p.board_id}</div>
          <hr />
        </div>
      ))
    )
  }
  
  return (
    <div>
      All Posts
       {renderPosts()}
    </div>
  )
}

export default AllPosts;