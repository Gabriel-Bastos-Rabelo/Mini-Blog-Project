import React from 'react'

import { useState, useEffect } from 'react';
import { useAuthentication } from '../../hooks/useAuthentication';
import styles from './Login.module.css'

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword]= useState("");
  const [error, setError] = useState("")
  const {logIn, error: authError, loading, setError: setAuthError} = useAuthentication();


  useEffect(() => {

      if(authError){
          setError(authError)
      }

  }, [authError])

  


  const handleSubmit = async (e) => {
      e.preventDefault();

      const user = {
         
          email,
          password
      }

     

      const res = await logIn(user);


      if(res){
          console.log(res)
          setError(null)
          setAuthError(null)
          
      }

      

      
  }
  return (
    <div className={styles.login}>

      <h1>Entrar</h1>
      <p>Faça o login para poder utilizar o sistema</p>

      <form onSubmit={handleSubmit}>
         
          <label>
              <span>E-mail:</span>

              <input type="email" name = 'email' className='displayEmail' placeholder='E-mail do usuário' value = {email} onChange={(e) => setEmail(e.target.value)}required />
          </label>

          <label>
              <span>Senha:</span>

              <input type="password" name = 'password' className='displaySenha' placeholder='Senha do usuário' value = {password} onChange={(e) => setPassword(e.target.value)}required/>
          </label>

          

          {loading && <button type='submit' className='btn' disabled>Aguarde</button>}
          {!loading && <button type='submit' className='btn'>Entrar</button>}
          

          {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default Login