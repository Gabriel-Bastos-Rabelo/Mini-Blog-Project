import React from 'react'
import styles from './Post.module.css'

import { useParams } from 'react-router-dom'
import { useFetchDocument } from '../../hooks/useFetchDocument';

function Post() {

    const {id} = useParams();
    const {document: post, loading, error} = useFetchDocument("posts", id);
    console.log(post)

  return (
    <>
    {loading && <p>Carregando...</p>}


    <div className={styles.div_pai}>


    {post && <div className = {styles.post_container}>
        <h1>{post.titulo}</h1>
        <h3>Criado por: {post.createdBy}</h3>
        <img src={post.imagem} alt={post.titulo} />
        <p>{post.body}</p>
        <div className = {styles.tags}>

        {post.arrayTags && post.arrayTags.map((tag) => (<p> <span>#</span>{tag}</p>))}
        </div>


        
        </div>}
    </div>
    </>

  )
}

export default Post