import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(props) {
  return (
    <>
     <nav className="navbar">
        <div className="navbar-container containerNav">
            <input type="checkbox" name="" id=""/>
            <div className="hamburger-lines">
                <span className="line line1"></span>
                <span className="line line2"></span>
                <span className="line line3"></span>
            </div>
            <ul className="menu-items">
                <li><Link to="/">Home</Link></li>
                {props.auth && <><li><Link to="/profile">Profile</Link></li></>}
                {
                   !props.auth ? <><li><Link to="/signup">Signup</Link></li>
                   <li><Link to="/login">Login</Link></li></> :

                   props.auth && <><li><Link to="/logout">Logout</Link></li></>
                } 
                 
            </ul>
            <h1 className="logo">vForum</h1>
        </div>
    </nav> 
    </>
  )
}

export default Navbar
