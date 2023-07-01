import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from "../components/Spinner";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login(props) {
  const usNavigate = useNavigate();
  const[spin,setSpin] = useState(false);

  const[user,setUser] = useState({
    email:"",password:""
  });

  let name,value;
  const handleInput = (e)=>{
    name = e.target.name;
    value = e.target.value;

    setUser({...user,[name]:value});
  }

  const userData = async(e)=>{
    setSpin(true);
       e.preventDefault();

       const {email,password} = user;

       try {
         const res = await fetch("http://localhost:3490/login",{
          method: "POST",
            headers:{
              "Content-Type":"application/json"
          },
            body:JSON.stringify({
              email,password
            })
         })

         const data = await res.json();

         if (res.status===201) {
          localStorage.setItem("token",data.token);
          props.setAuth(JSON.stringify(data.token));
          setTimeout(() => {
            setSpin(false);
          }, 1000);
          setTimeout(() => {
            toast.success("Login successfully");
          }, 2000);
          setTimeout(() => {
            usNavigate("/");
          }, 3000);
         } else {
          setTimeout(() => {
            setSpin(false);
          }, 1000);
          setTimeout(() => {
            toast.error(data.message);
          }, 2000);
          setUser({ email:"",password:""})
         }
       } catch (error) {
         console.log(error);
         setSpin(false);
       }
  }
  return (
    <>
    {
      spin && <Spinner/>
    }
    {
      !spin && <form className="login" method='POST'>
        <h2>Welcome, User!</h2>
        <p>Please log in</p>
        <input type="email" onChange={handleInput} name='email' value={user.emailuser} placeholder="Email" />
        <input type="password" onChange={handleInput} name='password' value={user.password} placeholder="Password" />
        <input type="submit" onClick={userData} value="Log In" />
        <div className="links">
           <Link to="/signup"><h5>New to vForum?</h5></Link>
        </div>

        <ToastContainer  
         position="top-center"
         autoClose={2000}
         newestOnTop
         closeOnClick={true}
         rtl={false}
         draggable
         pauseOnHover={false}
         theme="colored"/>               
    </form> 
    }
    </>
  )
}

export default Login
