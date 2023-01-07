import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import MenuIcon from "@mui/icons-material/Menu";

function Navbar() {

    let [expandNavbar, setExpandNavbar] = useState(false);

    const location = useLocation();

    useEffect(()=>{
        setExpandNavbar(false)
    },[location])

  return (
    <div className='navbar' id={expandNavbar ? "open" : "close"}>
        <div className='toggle-button'>
            <button onClick={()=>{
                setExpandNavbar((prev) => !prev)
            }}> <MenuIcon /> </button>
        </div>
        <div className='links'>
            <Link to="/">Home</Link>
            <Link to="/new-issue">Create Ticket</Link>
            <Link to="/track-issue">Track Ticket</Link>
            <Link to="/dashboard">Dashbord</Link>
            <Link to="/contact">Contact</Link>              
        </div>
    </div>
  )
}

export default Navbar