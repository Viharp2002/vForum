import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from "../components/Spinner";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup(props) {
    const usNavigate = useNavigate();
  const[spin,setSpin] = useState(false);

    const[user,setUser] = useState({
        email:"", username:"",password:"",cpassword:""
    });

    let name,value;
    const handleInputs = (e)=>{
        name = e.target.name;
        value = e.target.value;

        setUser({...user,[name]:value});
    }

    const userData = async(e)=>{
    setSpin(true);
      e.preventDefault();
       const {email,username,password,cpassword} = user;

       try {
          const res = await fetch("http://localhost:3490/signup",{
            method: "POST",
            headers:{
              "Content-Type":"application/json"
          },
            body:JSON.stringify({
              email,username,password,cpassword
            })
        });

       const data = await res.json();
 
        if(res.status===201){
          localStorage.setItem("token",data.token);
          props.setAuth(JSON.stringify(data.token));
           
          setTimeout(() => {
            setSpin(false);
          }, 1000);
          setTimeout(() => {
            toast.success("Signup successfully");
          }, 2000);
          setTimeout(() => {
            usNavigate("/");
          }, 3000);
        }else{
          setTimeout(() => {
            setSpin(false);
          }, 1000);
          setTimeout(() => {
            toast.error(data.message);
          }, 2000);
          setUser({ email:"",password:"",cpassword:""})
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
      !spin &&  <form className="login" method='POST'>
        <h2>Welcome, User!</h2>
        <p>Please Signup</p>
        <input type="email" name='email' value={user.email} onChange={handleInputs} placeholder="Email" />
        <input type="text" name='username' value={user.username} onChange={handleInputs} placeholder="Username" />
        <input type="password" name='password' value={user.password} onChange={handleInputs} placeholder="Password" />
        <input type="password" name='cpassword' value={user.cpassword} onChange={handleInputs} placeholder="Confirm Password" />
        <input type="submit" onClick={userData} value="Signup" />
        <div className="links">
        <Link to="/login"><h5>Already have an account?</h5></Link>
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

export default Signup
