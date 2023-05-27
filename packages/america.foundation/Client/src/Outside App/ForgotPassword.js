import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../AuthContext";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  return (
    <div className="fp">
      <div className="fp_topbar">
        <div className="fp_login_container">
          <Link className="fp_login" to="/LogIn">
            Back to Login
          </Link>
        </div>
        <div className="fp_naa_container">
          <Link className="fp_naa" to="/SignUp">
            Need an account?
          </Link>
        </div>
      </div>
      <div className="fp_container">
        <form className="fp_page" onSubmit={handleSubmit}>
          <div className="fp_title">Password Reset</div>
          <div className="fp_email_container">
            <input
              className="fp_email"
              type="email"
              placeholder="Account's Email Address"
              ref={emailRef}
              required
            />
          </div>
          {error && <div className="fp_error">{error}</div>}
          {message && <div className="fp_success">{message}</div>}
          <div className="fp_button_container">
            <button disabled={loading} className="fp_button" type="submit">
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
