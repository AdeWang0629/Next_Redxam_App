import React from 'react'
import "./Account_Settings_SecurityAndPrivacy.css"

function Account_Settings_SecurityAndPrivacy() {
  return (
    <div>
    <h1>
      Security
     </h1>
    <div className='security_advice'>
      Keep your America Foundation account secure with additional layers of protection
    </div>

    <div className='password_container'>
      <div className='password'>Password</div>
      <div className='update_password'> Update Password</div>
    </div>
    <div className='two-factor_authentication_container'>
      <div className='two-factor_authentication'>Two-Factor Authentication</div>
      </div>
      <h1>
      Privacy
     </h1>
     <div className='privacy_advice'>
        Manage how your data is used
    </div>
    <div className='request_data_deletion_container'>
      <div className='request_data_deletion'>Request Data Deletion</div>
    </div>
   
    <div className='privacy_policy_container'>
      <div className='privacy_policy'>Privacy Policy</div>
    </div>
    <div className='deactivate_your_account_container'>
      <div className='deactivate_your_account'>Deactivate your Account</div>
    </div>


    </div>
  )
}

export default Account_Settings_SecurityAndPrivacy
