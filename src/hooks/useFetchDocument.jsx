import { useEffect, useState } from "react"

import { db } from "../firebase/config"

import { doc, getDoc } from "firebase/firestore"


export const useFetchDocument = (docCollection, id) => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [document, setDocument] = useState(null);
    const [cancelled, setCancelled] = useState(false);


    useEffect(() => {
       

        async function loadDoc(){

            if(cancelled){
                return;
            }

            setLoading(true)
            

            try{
                
                
                const docRef = doc(db, docCollection, id);
                const docSnap = await getDoc(docRef)

                setDocument(docSnap.data());
                
               

                setLoading(false)

                

            }catch(error){
                console.log(error)

                setError(error.message)

                setLoading(false)

                console.log("deu errado")

            }
        }

        loadDoc();
    }, [docCollection, id])

    useEffect(() => {
        return () => setCancelled(true);
    })

    return {document, loading, error}
}