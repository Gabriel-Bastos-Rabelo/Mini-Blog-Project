import React, { useState } from 'react'

import styles from "./Home.module.css"
import { Link } from 'react-router-dom'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import PostDetails from '../../components/PostDetails'
import { useNavigate } from 'react-router-dom'

function Home() {

  

  const {documents: posts, loading} = useFetchDocuments("posts")
  const [query, setQuery] = useState("");

  const navigate = useNavigate();



  const handleSubmit = (e) => {
      e.preventDefault();

      if(query){
        return navigate(`/search?q=${query}`)
      }




  }
  return (
    <div className={styles.home}>
    
    <h1>Veja nossos post mais recentes</h1>

    <form onSubmit={handleSubmit} className = {styles.search_form}>
      <input type="text" name = "query" value = {query} placeholder='Ou busque por tags' onChange={(e) => setQuery(e.target.value)}/>
      <button type='submit' className='btn btn-dark'>Pesquisar</button>
    </form>
    
    <div>
      {posts && posts.map((post) => (
        <PostDetails post = {post}/>
        
      )
        
      )}
    </div>

      {posts && posts.length  == 0 && <div className = {styles.noposts}><p>Não foram encontrados posts</p> <Link to = "/posts/create" className = "btn">Criar primeiro post</Link></div>}
      </div>

    
  )
}

export default Home