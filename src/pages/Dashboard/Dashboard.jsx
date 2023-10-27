import React from 'react'

import styles from './Dashboard.module.css'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'

import { useAuthValue } from '../../context/AuthContext'
import { Link } from 'react-router-dom'

import { useDeleteDocument } from '../../hooks/useDeleteDocument'



function Dashboard() {

  const user = useAuthValue();
  const uid = user.uid;
  const {documents: posts, loading, error} = useFetchDocuments("posts", null, uid);
  const {deleteDocument} = useDeleteDocument("posts");

  const deletar = (id) => {
    console.log(id)
    deleteDocument(id);
  }

  console.log(posts)

  
  return (
    

    <div className = {styles.dashboard}>

        <h2>Dashboard</h2>
        <p>Gerencie os seu posts</p>
        {loading && <p>Carregando...</p>}

        {posts && posts.length === 0 && <div>
          <p>Não foram encontrados posts</p>
          <Link to = "/posts/create" className = {styles.noposts}>Criar</Link>
          </div>}

        {posts && posts.length > 0 && 
        
          <>
            <div className = {styles.post_header}>

              <p>Título</p>
              <p>Ações</p>
            </div>


            
            {posts.map((post) => <div className = {styles.post_row}>
              
              
              <p>{post.titulo}</p>
              
              <div>

              <Link to = {`/posts/${post.id}`} className='btn btn-outline'>Ler</Link>
              <Link to = {`/posts/edit/${post.id}`} className='btn btn-outline'>Editar</Link>
              <button onClick={() => deletar(post.id)} className='btn btn-outline btn-danger'>Deletar</button>
              </div>
              
              </div>)}
          </>
        
      }

      </div>

  )
}

export default Dashboard