import React from 'react'

import { useState, useEffect } from 'react'

import styles from './CreatePost.module.css'
import { useInsertDocument } from '../../hooks/useInsertDocument'
import { useAuthentication } from '../../hooks/useAuthentication'
import { useAuthValue } from '../../context/AuthContext'
import { useNavigate } from "react-router-dom";

function CreatePost() {

    const [titulo, setTitulo] = useState("")
    const [body, setBody] = useState("")
    const [imagem, setImagem] = useState("")
    const [tags, setTags] = useState("")
    const [formError, setFormError] = useState("")
    const {insertDocument, response} = useInsertDocument("posts");
    const user = useAuthValue();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

       
        

        setFormError("")

        console.log(formError)

        


        //validação da imagem

        try{
            
            new URL(imagem)
           
        }catch(error){

            setFormError("URL da imagem inválida");
           
            return;
            
        }

        

        //criar o array de tags

        const arrayTags = tags.split(",").map((tag) => tag.trim().toLowerCase())

       

        //checar todos os valores

        if(!titulo || !body || !imagem || !tags){

            console.log("chegou no erro de campo vazio")

            setFormError("Todos os campos devem ser preenchidos!");
          
            return;
        }
        

        

        

        const data = {
            titulo,
            body,
            imagem,
            arrayTags,
            uid: user.uid,
            createdBy: user.displayName


        }

        insertDocument(data);

        navigate("/");

    }

    useEffect(() => {
        console.log(user)
    }, [user])
    return (
        <>

            <div className={styles.create_post}>

                <h2>Criar Post</h2>
                <p>Escreva sobre o que quise e compartilhe o seu conhecimento!</p>

                <form onSubmit={handleSubmit}>
                    <label>
                        Título:
                        <input type="text" value = {titulo} name = 'title' placeholder='pense num título bom' onChange={(e) => setTitulo(e.target.value)} />

                    </label>

                    <label>
                        URL da imagem:
                        <input type="text" value = {imagem} name = 'image' placeholder='insira uma imagem que representa o seu post' onChange={(e) => setImagem(e.target.value)} />

                    </label>


                    <label>
                        Conteúdo:
                        <input type="text" name = 'body' value = {body} placeholder='Insira o conteúdo do post' onChange={(e) => setBody(e.target.value)} />

                    </label>


                    <label>
                        Tags:
                        <input type="text" value = {tags} name = 'tags' placeholder='Insira as tags separadas por virgula' onChange={(e) => setTags(e.target.value)} />

                    </label>

                    

                    {response.loading && <button type='submit' className='btn' disabled>Aguarde</button>}
                    {!response.loading && <button type='submit' className='btn'>Postar</button>}
                    

                    {response.error && <p className="error">{response.error}</p>}
                    {formError && <p className="error">{formError}</p>}

                    
                </form>
            </div>


        </>
    )
}

export default CreatePost  