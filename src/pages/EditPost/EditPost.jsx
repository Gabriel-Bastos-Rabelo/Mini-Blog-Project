import React from 'react'

import { useState, useEffect } from 'react'

import styles from './EditPost.module.css'
import {useFetchDocument} from '../../hooks/useFetchDocument'
import { useAuthentication } from '../../hooks/useAuthentication'
import { useAuthValue } from '../../context/AuthContext'
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom'
import {useEditDocument} from '../../hooks/useEditDocument'

function EditPost() {

    const [titulo, setTitulo] = useState("")
    const [body, setBody] = useState("")
    const [imagem, setImagem] = useState("")
    const [tags, setTags] = useState("")
    const [formError, setFormError] = useState("")
    const user = useAuthValue();
    const navigate = useNavigate();
    const {id} = useParams();
    const {document: post, loading, error} = useFetchDocument("posts", id)
    const {editDocument} = useEditDocument("posts");




    useEffect(() => {
        if(post){
            setTitulo(post.titulo);
            setBody(post.body);
            setImagem(post.imagem);
            

            const tagsString = post.arrayTags.join(", ")

           
            setTags(tagsString)


        }
       
    }, [post])

    const handleSubmit = (e) => {

        e.preventDefault();

        setFormError("");

        //validação da imagem

        try{
            new URL(imagem);
        }catch(error){
            setFormError("URL da imagem inválida");

            return;
        }

        //criar o array das tags

        const arrayTags = tags.split(",").map((tag) => tag.trim().toLowerCase());

        if(!titulo || !body || !imagem || !tags){
            setFormError("Todos os campos devem ser preenchidos");
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

        editDocument(id, data);

        navigate("/dashboard");



    }

    

    
    return (
        <>

        {post && 

            <div className={styles.edit_post}>

                <h2>Editar post</h2>
                <p>Altere os dados do post como desejar!</p>

                <form onSubmit={handleSubmit}>
                    <label>
                        Título:
                        <input type="text" value = {titulo} name = 'title' placeholder='pense num título bom' onChange={(e) => setTitulo(e.target.value)} />

                    </label>

                    <label>
                        URL da imagem:
                        <input type="text" value = {imagem} name = 'image' placeholder='insira uma imagem que representa o seu post' onChange={(e) => setImagem(e.target.value)} />

                    </label>

                    <p className = {styles.preview_title}>Preview da imagem</p>
                    <img className = {styles.preview_image} src={imagem} alt={titulo}/>


                    <label>
                        Conteúdo:
                        <input type="text" name = 'body' value = {body} placeholder='Insira o conteúdo do post' onChange={(e) => setBody(e.target.value)} />

                    </label>


                    <label>
                        Tags:
                        <input type="text" value = {tags} name = 'tags' placeholder='Insira as tags separadas por virgula' onChange={(e) => setTags(e.target.value)} />

                    </label>

                    

                    {loading && <button type='submit' className='btn' disabled>Aguarde</button>}
                    {!loading && <button type='submit' className='btn'>Postar</button>}
                    

                    {error && <p className="error">{error}</p>}
                    {formError && <p className="error">{formError}</p>}

                    
                </form>
            </div>

        }


        </>
    )
}

export default EditPost