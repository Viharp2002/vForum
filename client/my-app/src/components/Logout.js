import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Logout(props) {
  const usNavigate = useNavigate();

  const logout = ()=>{
    localStorage.removeItem("token");
    props.setAuth(null);
    usNavigate("/login");
  };

  useEffect(()=>{
    logout();
  })
}

export default Logout
