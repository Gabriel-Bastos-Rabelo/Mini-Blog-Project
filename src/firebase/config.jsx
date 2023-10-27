import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDDMPf1-8hs_hOB-vhFPXU0VFba5y15XV8",
  authDomain: "miniblog-9ceea.firebaseapp.com",
  projectId: "miniblog-9ceea",
  storageBucket: "miniblog-9ceea.appspot.com",
  messagingSenderId: "541299597457",
  appId: "1:541299597457:web:3c0ff2631b165ac3701f30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const db = getFirestore(app)

export {db}