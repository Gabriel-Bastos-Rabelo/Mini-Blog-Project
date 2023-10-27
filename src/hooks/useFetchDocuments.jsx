import { useEffect, useState } from "react";

import { db } from "../firebase/config";
import React from 'react'

import { collection, getDocs, query, orderBy, where, onSnapshot, QuerySnapshot, Query } from "firebase/firestore";

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    

    //deal with memory leak

    const [cancelled, setCancelled] = useState(null);


    useEffect(() => {

        async function loadData(){
            if(cancelled){
                return;
            }

            setLoading(true);

            const collectionRef = collection(db, docCollection)

            try{
                let q
                if(search){
                    q = await query(collectionRef, where("arrayTags", "array-contains", search), orderBy("createdAt", "desc"));
                }
                else if(uid){
                    q = await query(collectionRef, where("uid", "==", uid), orderBy("createdAt", "desc"));
                }
                else{
                    q = await query(collectionRef, orderBy("createdAt", "desc"));
                }
               
                


                await onSnapshot(q, (querySnapshot) => {
                    setDocuments(
                        querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data()
                        }))
                    )
                })

                setLoading(false);

            }catch(error){
                console.log(error);
                setError("Houve um erro, tente novamente mais tarde")

                setLoading(false); 
            }
    
        }

        loadData();
        

    }, [docCollection, search, uid, cancelled])


    useEffect(() => {
        return () => setCancelled(true);
    }, [])


    return {documents, loading, error}
    
}