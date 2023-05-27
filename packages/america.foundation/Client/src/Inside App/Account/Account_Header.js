import React from 'react'
import "./Account_Header.css"
import { Link } from "react-router-dom";

function Account_Header() {
  return (
    <div className='account_header_container'> 
    <h1>Customer Name</h1>
    <div className='account_menuItems'>
     <Link to="/Account/Investing">Investing</Link>
     <Link to="/Account/Cryto">Cryto</Link>
     <Link to="/Account/Transfers">Transfers</Link>
     <Link to="/Account/Recurring">Recurring</Link>
     <Link to="/Account/Statements">Statements</Link>
     <Link to="/Account/History">History</Link>
     <Link to="/Account/Settings">Settings</Link>
     <Link to="/Account/Help">Help</Link>
     
    </div>
    </div>
  )
}

export default Account_Header
