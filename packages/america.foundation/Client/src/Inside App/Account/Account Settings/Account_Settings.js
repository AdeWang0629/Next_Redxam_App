import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import "./Account_Settings.css"


function Account_Settings() {
  return (
    <div className='account_settings_container'>
      <div className='account_settings_sidebar'>
        <div className='account_details_and_options'>
          Account Details and Options
        </div>
        <div className='account_settings_sidebar_menuItems'>
          <Link to="/Account/Settings/PersonalInfo">Personal Info</Link>
          <Link to="/Account/Settings/SecurityAndPrivacy">Security and Privacy</Link>
          <Link to="/Account/Settings/Beneficiaries">Beneficiaries</Link>
        </div>
        <div className='App_Preferences'>
            App Preferences
        </div>
         <div className='account_settings_sidebar_menuItems'>
          <Link to="/Account/Settings/AppAppearance">App Appearance</Link>  
         </div>
      </div>

      <div className='account_settings_body'>
        <Outlet />
      </div>
    </div>
  )
}

export default Account_Settings
