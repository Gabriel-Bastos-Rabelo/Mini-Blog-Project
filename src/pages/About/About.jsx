import React from 'react'
import { Link } from 'react-router-dom'
import styles from './About.module.css'

function About() {
  return (
    <>

    <div className={styles.about}>

    
      <h2>
        Sobre o Mini <span>Blog</span>
      </h2>
      <p>
        Este projeto consiste de um mini blog feito com react no front end e Firebase no backend
      </p>

      <Link to="/posts/create" className = "btn">Criar post</Link>
    
    </div>
    </>
  )
}

export default About