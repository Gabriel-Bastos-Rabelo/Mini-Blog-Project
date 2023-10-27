import React from 'react'

import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useQuery } from '../../hooks/useQuery'
import PostDetails from '../../components/PostDetails';
import styles from "./Search.module.css"
import { Link } from 'react-router-dom';



function Search() {

    const query = useQuery();
    console.log(query)
    const search = query.get("q");

    const {documents: posts} = useFetchDocuments("posts", search)





  return (

    <div className={styles.search}>

    <h1>Search</h1>
    {posts && posts.length === 0 && <>
    <p>Nenhum post foi encontrado na busca</p> <Link className="btn btn-outline" to = "/">Voltar</Link>
    
    </>}
    {posts && posts.map((post) => (
        <PostDetails key = {post.id} post = {post}/>
    ))}
  
    </div>
  )
}

export default Search