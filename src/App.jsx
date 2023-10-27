import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { useAuthentication } from './hooks/useAuthentication'
import './App.css'

import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'

import Home from './pages/Home/Home'

import About from './pages/About/About'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import { onAuthStateChanged } from 'firebase/auth'
import Dashboard from './pages/Dashboard/Dashboard'
import CreatePost from './pages/CreatePost/CreatePost'
import Search from './pages/Search/Search'
import Post from './pages/Post/Post'
import EditPost from './pages/EditPost/EditPost'


function App() {

  const [user, setUser] = useState(undefined);

  const {auth} = useAuthentication();

  const loadingUser = user === undefined;

  
  useEffect(() => {

    onAuthStateChanged(auth, (user) => {setUser(user)})
    

  }, [auth])

  if(loadingUser){
    return(
      <p>Carregando...</p>
    )
  }


  return (
    <>

    <AuthProvider value={user}>

   
    <BrowserRouter>

    
    <Navbar/>
    <div className="container">
      

      <Routes>
            <Route path = "/" element={<Home/>}></Route>
            <Route path = "/about" element={<About/>}></Route>
            <Route path = '/posts/:id' element={<Post/>}></Route>
            <Route path = "/register" element={user ? <Navigate to = '/'/> : <Register/>}></Route>
            <Route path = "/login" element={user ? <Navigate to = '/'/> : <Login/>}></Route>
            <Route path='/dashboard' element={user ? <Dashboard/> : <Navigate to = '/'/>}/>
            <Route path='/posts/create' element={user ? <CreatePost/> : <Navigate to = '/'/>}></Route>
            <Route path='/posts/edit/:id' element={user ? <EditPost/> : <Navigate to = '/'/>}></Route>
            <Route path = "/search" element = {<Search/>}></Route>
        
      </Routes>

      
    </div>

    <Footer/>
    
    
    
    </BrowserRouter>

    </AuthProvider>


   
      
    </>
  )
}

export default App
