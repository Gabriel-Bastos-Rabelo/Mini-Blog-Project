import React, { useEffect } from 'react'
import { useState } from 'react';
import styles from './Register.module.css'

import { useAuthentication } from '../../hooks/useAuthentication';

function Register() {

    const [name,setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword]= useState("");
    const [confirmation, setConfirmation] = useState("");
    const [error, setError] = useState("")
    const {createUser, error: authError, loading, setError: setAuthError} = useAuthentication();


    useEffect(() => {

        if(authError){
            setError(authError)
        }

    }, [authError])

    


    const handleSubmit = async(e) => {
        e.preventDefault();

        const user = {
            name,
            email,
            password
        }

        if(password != confirmation){

            setError("As senha não são iguais");

            

        }


        const res = await createUser(user);


        if(res){
            console.log(res)
            setError(null)
            setAuthError(null)
            
        }

        

        
    }
  return (

    
    <div className={styles.register}>

    <h1>Cadastre-se para postar</h1>

    <form onSubmit={handleSubmit}>
        <label>
            <span>Nome:</span>

            <input type="text" name = 'name' className='displayName' placeholder='Nome do usuário' required  value={name} onChange={(e) => setName(e.target.value)}/>
        </label>
        <label>
            <span>E-mail:</span>

            <input type="email" name = 'email' className='displayEmail' placeholder='E-mail do usuário' value = {email} onChange={(e) => setEmail(e.target.value)}required />
        </label>

        <label>
            <span>Senha:</span>

            <input type="password" name = 'password' className='displaySenha' placeholder='Senha do usuário' value = {password} onChange={(e) => setPassword(e.target.value)}required/>
        </label>

        <label>
            <span>Confirmação de senha:</span>

            <input type="password" name = 'confirmPassword' className='displaySenhaConfirmation' placeholder='Confirme a sua senha' value = {confirmation} onChange={(e) => setConfirmation(e.target.value)}required />
        </label>

        {loading && <button type='submit' className='btn' disabled>Aguarde</button>}
        {!loading && <button type='submit' className='btn'>Cadastre</button>}
        

        {error && <p className="error">{error}</p>}
    </form>

    
    </div>
  )
}

export default Register