import { db } from '../firebase/config';

import {
    getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'

import { useState, useEffect } from 'react'


export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [cancelled, setCancelled] = useState(false);
    const [loading, setLoading] = useState(null);

    //cleanup
    //deal with memory leak

    const auth = getAuth();

    function checkIfIsCancelled(){
        if(cancelled){
            return;
        }
    }

    const createUser = async (data) => {
        checkIfIsCancelled();
        setLoading(true);


        try{

            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.name
            })

            setLoading(false)

            return user;

        }catch(error){

            console.log(error.message);
            console.log(typeof error.message)

            let systemErrorMessage;

            if(error.message.includes("Password")){
                systemErrorMessage = "A senha precisa ter no mínimo 6 caracteres";
            }
            else if(error.message.includes("email-already")){
                systemErrorMessage = "E-mail já cadastrado";
            }
            else{
                systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde";
            }

            setError(systemErrorMessage);
            
        }

        setLoading(false)
    }

    const logOut = async(data) => {
        checkIfIsCancelled();
        signOut(auth);
        
    }


    const logIn = async (data) => {
        checkIfIsCancelled();
        setLoading(true);

        try{
            await signInWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            setLoading(false);

            return
        }catch(error){

            let systemErrorMessage;

            console.log(error)

            console.log(typeof error.message)


            if(error.message.includes("user-not-found")){
                systemErrorMessage = "Usuário não encontrado.";
            }
            else if(error.message.includes("Password")){
                systemErrorMessage = "Senha Incorreta";
            }

            else{
                systemErrorMessage = "Ocorreu um erro, tente novamente mais tarde";
            }

            setError(systemErrorMessage);

            setLoading(false);

        }


    }


    useEffect(() => {
        return () => setCancelled(true);
    }, [])


    return {auth, error, loading, createUser, setError, logOut, logIn}

}