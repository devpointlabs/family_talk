import React from "react"
import { Image, Card, Icon, Header } from "semantic-ui-react"


const Post = ({post}) => {
  return(
    <div>
       <Card key={post.id}>
         <Image src={post.image}/>
         <Header> {post.title}</Header>
         <description>{post.description}</description>
      </Card>
      <br/>
    </div>
  )
}

export default Post