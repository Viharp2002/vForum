import { Route,Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Logout from './components/Logout';
import LangCompo from "./components/LangCompo";
import Profile from "./components/Profile";
import Comments from "./components/Comments";
import { useEffect, useState } from 'react';

function App() {
  const[auth,setAuth] = useState();

  useEffect(()=>{
    setAuth(localStorage.getItem("token"));
  },[])
  return (
    <>
      <Navbar auth={auth}/> 
      <Routes>
         <Route path='/' element={<Home/>}/>
         <Route path='/login' element={<Login setAuth={setAuth}/>}/>
         <Route path='/signup' element={<Signup setAuth={setAuth}/>}/>
         <Route path='/logout' element={<Logout setAuth={setAuth}/>}/>
         <Route path='/langCompo/:techname' element={<LangCompo/>}/>
         <Route path='/profile' element={<Profile/>}/>
         <Route path='/comments/:_id' element={<Comments/>}/>
      </Routes>
    </>
  );
}

export default App;
