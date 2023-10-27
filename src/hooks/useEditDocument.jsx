import { doc, updateDoc } from "firebase/firestore"

import { db } from "../firebase/config";




export const useEditDocument = (docCollection) => {



    const editDocument = async (id, data) => {


        try{

            const docRef  = doc(db, docCollection, id);

            const updatedDoc = await updateDoc(docRef, data);





        }catch(error){
            console.log(error)

        }
    }


    return {editDocument};
}