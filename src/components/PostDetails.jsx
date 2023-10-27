import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./PostDetails.module.css"

function PostDetails({post}) {
  return (
    <div className={styles.post_detail}>

        <img src={post.imagem}/>
        <h2>{post.titulo}</h2>
        <p className={styles.createdby}>{post.createdBy}</p>

        <div className={styles.tag}>


        {post.arrayTags && post.arrayTags.map((tag) => (
            <p key = {tag}>

                <span>#</span>
                {tag}
            </p>
        ))}

        </div>

        <Link to = {`/posts/${post.id}`} className='btn btn-outline'>Ler</Link>



    </div>
  )
}

export default PostDetails