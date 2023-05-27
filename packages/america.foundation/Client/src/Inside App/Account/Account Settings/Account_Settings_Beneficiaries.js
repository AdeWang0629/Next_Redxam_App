import React from "react";
import "./Account_Settings_Beneficiaries.css";
function Beneficiaries() {
  return (
    <div className="beneficiaries">
      <h1>Beneficiaries</h1>
      <div className="beneficiaries_info">
        You can add up to 10 beneficiaries and change them at any time.
      </div>
      <div className="outside_beneficiaires_container">
        <div className="beneficiaries_container">
          <div className="add_beneficiaries">Add Beneficiaries</div>
        </div>
      </div>
    </div>
  );
}

export default Beneficiaries;
