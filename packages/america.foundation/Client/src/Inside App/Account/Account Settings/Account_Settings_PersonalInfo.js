import React, { useState } from "react";
import "./Account_Settings_PersonalInfo.css";
import { useAuth } from "../../../AuthContext";
import { EmailAuthProvider } from "firebase/auth";
import { Alert } from "react-bootstrap";
import {
  collection,
  doc,
  onSnapshot,
  getDocs,
  getDoc,
  query,
  where,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { isValidFormat } from "@firebase/util";

function PersonalInfo() {
  const { currentUser } = useAuth();
  const { verifyEmail } = useAuth();
  const [email, setEmail] = useState("");
  const { updatesEmail } = useAuth();
  const { reauth } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const { reauthModalOpen, setReauthModalOpen } = useAuth();
  const [reauthemail, setReauthemail] = useState("");
  const [reauthpassword, setReauthpassword] = useState("");
  const credential = EmailAuthProvider.credential(reauthemail, reauthpassword);

  const handleSubmit = async (e) => {
    setError("");
    try {
      const currentEmail = currentUser.email;
      console.log(currentEmail);
      await updatesEmail(email);

      await updateDoc(doc(db, "users", currentUser.uid), {
        current_email: email,
        past_email: arrayUnion(currentEmail),
      });
      // window.location.reload();
    } catch (e) {
      setError(e.message);
      if (e.message.includes("requires-recent-login")) {
        setReauthModalOpen(true);
        console.log("reauth modal");
      }
      console.log(e.message);
    }
  };

  const handleReauthSubmit = async (e) => {
    try {
      await reauth(credential);
      setReauthModalOpen(false);
      console.log("reauth success");
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <div className="personal_info">
      <h1>Personal Information</h1>
      <div className="contact_info">Contact Information</div>

      <div className="name_container">
        <div className="name">Name</div>
        <div className="customer_name"> Customer Name (not edditable)</div>
      </div>

      <div
        className="email_address_container"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="email_address">Email Address</div>
        <div className="customer_email_address_container">
          <div className="customer_email_address">{currentUser.email}</div>
          <div
            className={`email_vefication_mark ${
              currentUser.emailVerified ? "verified" : "not-verified"
            }`}
          >
            {currentUser.emailVerified ? "Verified" : "Not Verified"}
          </div>
        </div>
      </div>
      <div className="phone_number_container">
        <div className="phone_number">Phone Number</div>
        <div className="customer_phone_number_container">
          <div className="customer_phone_number">Customer Phone Number</div>
          <div className="phone_number_vefication_mark">Verified</div>
        </div>
      </div>
      <div className="customer_address_container">
        <div className="address">Address</div>
        <div className="customer_Address">Customer Address</div>
      </div>
      <div className="trusted_contact_container">
        <div className="trusted_contact">Trusted Contact</div>
        <div className="customer_trusted_contact">
          {" "}
          Customer Trusted Contact
        </div>
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h1>Verify Email Address</h1>
            <p>{currentUser.email}</p>{" "}
            <button onClick={verifyEmail}>Verify</button>
            <h1>Update Email Address</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <input
              type="email"
              placeholder="Enter your new Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button onClick={handleSubmit}>Update Email</button>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
      {reauthModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h1>Please Authenticate Before</h1>
            <input
              type="email"
              placeholder="Enter your Email"
              onChange={(e) => setReauthemail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter your Password"
              onChange={(e) => setReauthpassword(e.target.value)}
              required
            />
            <button onClick={handleReauthSubmit}>Authenticate</button>
            <button onClick={() => setReauthModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PersonalInfo;
