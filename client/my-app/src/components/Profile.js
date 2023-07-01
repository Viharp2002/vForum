import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from "./Spinner";
import userPic from "../images/user.png";


function Profile() {
  const navigate = useNavigate();

  //spin
  const[spin,setSpin] = useState(false);
  const[spin3,setSpin3] = useState(false);
  const[spin4,setSpin4] = useState(false);

  //for showing update details and password
  const[updateShow,setUpdateShow] = useState(false);
  const[passwordUpdate,setPasswordUpdate] = useState(false);

  const[userprof,setUserprof] = useState([]);
  const [propUpdate,setProfUpdate] = useState({
    password:"",npassword:"",ncpassword:"",username:"",email:""
  })

  let name,value;
  const handleInput = (e)=>{
       name = e.target.name;
       value = e.target.value;

       setProfUpdate({...propUpdate,[name]:value});
  }

  const updatePassword = async(e)=>{
    setSpin3(true);
     e.preventDefault();

     const {password,npassword,ncpassword} = propUpdate;

     const res = await fetch("http://localhost:3490/changepass",{
       method:"POST",
       headers:{
        "Content-Type":"application/json",
        "Authorization": token
       },
       body:JSON.stringify({
          password,
          npassword,
          ncpassword
       })
     })

     const data = await res.json();

     if(res.status===201)
     {
       setTimeout(() => {
         setSpin3(false);
        }, 5000); 
        
        setTimeout(()=>{
          toast.success("Password Updated");
        },2000);

        setProfUpdate({
          password:"",npassword:"",ncpassword:"",username:"",email:""
         })
     }
     else{
      toast.error(data.msg);
      setSpin3(false); 
      setProfUpdate({
        password:"",npassword:"",ncpassword:"",username:"",email:""
       })
     }
  };

  const token = localStorage.getItem("token");

  const updateProfile = async(e)=>{
    setSpin(true);
     e.preventDefault();

     const{username,email} = propUpdate;

     const res = await fetch("http://localhost:3490/changeemail",{
      method:"POST",
      headers:{
       "Content-Type":"application/json",
       "Authorization": token
      },
      body:JSON.stringify({
          username,email
      })
     })

     const data = await res.json();

     if(res.status===201)
     {
       setTimeout(() => {
         setSpin(false);
       }, 1000);
  
       setTimeout(() => {
         toast.success("Profile Updated");
       }, 2000);
       setProfUpdate({
        password:"",npassword:"",ncpassword:"",username:"",email:""
       })
     }
     else{
     toast.error("Profile Not Updated");
      setSpin(false);
      setProfUpdate({
        password:"",npassword:"",ncpassword:"",username:"",email:""
       })
     }
  }

  const getProfile = async()=>{
    setSpin4(true);
     const res = await fetch("http://localhost:3490/profile",{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
          "Authorization": token
        }
     });

     const data = await res.json();
     setSpin4(false);
     if(!res.status===201 || !data)
     {
       alert("Login Required");
       navigate("/login");
     }
     else{
      setUserprof(data);
     }
  };

  //showing update info boxes
  const showUpdateDetails = ()=>{
   if(updateShow)
   {
      setUpdateShow(false);
   }
   else{
       setUpdateShow(true);
   }
  }
  //showing password change boxes
  const showPasswordBox = ()=>{
   if(passwordUpdate)
   {
      setPasswordUpdate(false);
   }
   else{
      setPasswordUpdate(true);
   }
  }
  useEffect(()=>{
     if(!localStorage.getItem("token"))
     {
        alert("Login First");
        navigate("/login");
     }
     else{
      getProfile();
     }
  },[]);
   
  return (
    <>
      <div className="center">
    <div className="containerr">
      <div className="left">
        <div className="photo">
            
          <img alt="user photo" className='vihu' src={userPic}/>
        </div>     
        <div className="title__contain">
        {
          spin4 && <Spinner/>
         }
         {!spin4 && <><div className="username">{userprof.username}</div>
          <div className="title">{userprof.email}</div></>
        }
          
        </div>
        <button className="follow viha" onClick={showUpdateDetails}>Update Info</button>
        {
                spin && <Spinner/>
          }
               {
               updateShow && 
               <form method='POST'><br/>
               Your Username: <input type="text" required value={propUpdate.username} style={{width: "100%"}} placeholder={userprof.username}  name="username" onChange={handleInput}></input><br/><br/>
               Your Email: <input type="text" required value={propUpdate.email} style={{width: "100%"}} placeholder={userprof.email} name="email" onChange={handleInput}></input><br/><br/>
               <button onClick={updateProfile} className="btn btn-primary" type="button">Update Info</button><br/><br/>
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
         <button className="message viha" onClick={showPasswordBox}>Update Password</button>
         {
                spin3 && <Spinner/>
               }
               {
               passwordUpdate &&
                <form method="POST"><br/>
                     Old password: <input type="password" value={propUpdate.password} style={{width: "100%"}} name="password" onChange={handleInput}></input>
                     <br/><br/>New password: <input type="password"style={{width: "100%"}} value={propUpdate.npassword} name="npassword" onChange={handleInput}></input>
                     <br/><br/> Confirm password: <input type="password" style={{width: "100%"}} value={propUpdate.ncpassword} name="ncpassword" onChange={handleInput}></input>
                     <br/><br/><button onClick={updatePassword} className="btn btn-primary" type="button">Update Password</button><br/><br/>
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
            
      </div>
      <div className="right">
        <div className="rightbox">
          <span className="large">0</span>
          <span className="small">Questions asked</span>
        </div>
        <div className="rightbox">
          <span className="large">0</span>
          <span className="small">Contribution</span>
        </div>
        <div className="rightbox">
          <span className="large">0</span>
          <span className="small">Likes</span>
        </div>
      </div>
    </div>
  </div>
    </>
  )
}

export default Profile
